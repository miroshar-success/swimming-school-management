import { IServiceOptions } from './IServiceOptions';
import DateTimeUtils from '../utils/dateTimeUtils';
import Error400 from '../errors/Error400';
import FileRepository from '../database/repositories/fileRepository';
import lodash from 'lodash';
import MongooseRepository from '../database/repositories/mongooseRepository';
import NewsArticleRepository from '../database/repositories/newsArticleRepository';
import NoteRepository from '../database/repositories/noteRepository';
import PolicyRepository from '../database/repositories/policyRepository';
import PolicyTemplateRepository from '../database/repositories/policyTemplateRepository';
import ProductRepository from '../database/repositories/productRepository';
import TagRefRepository from '../database/repositories/tagRefRepository';
import TagRefService from './tagRefService';
import Task from '../database/models/task';
import TaskInstance from '../database/models/taskInstance';
import TaskInstanceRepository from '../database/repositories/taskInstanceRepository';
import TaskInstanceRepositoryEx from '../database/repositories/extend/taskInstanceRepositoryEx';
import TaskListRepository from '../database/repositories/taskListRepository';
import TaskPriorityRepository from '../database/repositories/taskPriorityRepository';
import TaskRepository from '../database/repositories/taskRepository';
import TaskRepositoryEx from '../database/repositories/extend/taskRepositoryEx';
import UserRepository from '../database/repositories/userRepository';

export default class TaskInstanceService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async assignRelatedData(data, session) {
    data.taskList =
      await TaskListRepository.filterIdsInTenant(
        data.taskList,
        { ...this.options, session },
      );
    data.notes = await NoteRepository.filterIdsInTenant(
      data.notes,
      { ...this.options, session },
    );
    data.priority =
      await TaskPriorityRepository.filterIdInTenant(
        data.priority,
        { ...this.options, session },
      );
    data.owner = await UserRepository.filterIdInTenant(
      data.owner,
      { ...this.options, session },
    );
    data.approver = await UserRepository.filterIdInTenant(
      data.approver,
      { ...this.options, session },
    );
    data.newsArticles =
      await NewsArticleRepository.filterIdsInTenant(
        data.newsArticles,
        { ...this.options, session },
      );
    data.products =
      await ProductRepository.filterIdsInTenant(
        data.products,
        { ...this.options, session },
      );
    data.policyTemplates =
      await PolicyTemplateRepository.filterIdsInTenant(
        data.policyTemplates,
        { ...this.options, session },
      );
    data.policies =
      await PolicyRepository.filterIdsInTenant(
        data.policies,
        { ...this.options, session },
      );
    data.attachments =
      await FileRepository.filterIdsInTenant(
        data.attachments,
        { ...this.options, session },
      );
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      data.task = await TaskRepository.filterIdInTenant(
        data.task,
        { ...this.options, session },
      );

      const lastTaskInstance =
        await TaskInstanceRepository.findAndCountAll(
          {
            filter: {
              task: data.task,
            },
            limit: 1,
            orderBy: 'dueDate_DESC',
          },
          { ...this.options, session },
        );

      await this.assignRelatedData(data, session);

      const recurrenceDates = DateTimeUtils.RecurrenceDates(
        data.repeat,
        lastTaskInstance.rows[0]?.dueDate ?? data.dueDate,
        2,
      );
      data.reference = lastTaskInstance.rows[0].reference;
      data.dueDate =
        recurrenceDates[lastTaskInstance.rows.length];

      const record = await TaskInstanceRepository.create(
        data,
        {
          ...this.options,
          session,
        },
      );

      await this.updateForRepeatNever(
        {
          ...data,
          id: record.id,
          reference: record.reference,
          task: record.task.id,
        },
        {
          ...this.options,
          session,
        },
      );

      await TagRefRepository.save(
        record.repeat === 'Never' ? Task : TaskInstance,
        null,
        record.repeat === 'Never' ? record.task : record.id,
        data.tags,
        {
          ...this.options,
          session,
        },
      );

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'task',
      );

      throw error;
    }
  }

  async update(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      await this.assignRelatedData(data, session);

      const record = await TaskInstanceRepository.update(
        id,
        data,
        {
          ...this.options,
          session,
        },
      );

      await this.updateForRepeatNever(
        {
          ...data,
          id: record.id,
          reference: record.reference,
          task: record.task.id,
        },
        {
          ...this.options,
          session,
        },
      );

      await TagRefRepository.save(
        record.repeat === 'Never' ? Task : TaskInstance,
        null,
        record.repeat === 'Never' ? record.task : record.id,
        data.tags,
        {
          ...this.options,
          session,
        },
      );

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'task',
      );

      throw error;
    }
  }

  async updateForRepeatNever(record, options) {
    if (record.repeat === 'Never') {
      await TaskInstanceRepositoryEx.destroyMany(
        {
          task: record.task,
        },
        options,
      );
      await TaskInstanceRepositoryEx.create(
        {
          ...lodash.pick(record, TaskRepository.ALL_FIELDS),
          task: record.task,
        },
        options,
      );
      await TaskRepositoryEx.update(
        record.task,
        lodash.pick(record, TaskRepository.ALL_FIELDS),
        options,
      );
    }
  }

  async tags(id, data) {
    const record = await TaskInstanceRepository.findById(
      id,
      this.options,
    );

    await new TagRefService(this.options).save(
      record.repeat === 'Never' ? Task : TaskInstance,
      record.repeat === 'Never' ? record.task : record.id,
      data.tags,
    );
    return id;
  }

  async destroyAll(ids) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      for (const id of ids) {
        await TaskInstanceRepository.destroy(id, {
          ...this.options,
          session,
        });
      }

      await MongooseRepository.commitTransaction(session);
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  async findById(id) {
    return TaskInstanceRepository.findById(
      id,
      this.options,
    );
  }

  async findAllAutocomplete(search, limit) {
    return TaskInstanceRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return TaskInstanceRepository.findAndCountAll(
      args,
      this.options,
    );
  }

  async import(data, importHash) {
    if (!importHash) {
      throw new Error400(
        this.options.language,
        'importer.errors.importHashRequired',
      );
    }

    if (await this._isImportHashExistent(importHash)) {
      throw new Error400(
        this.options.language,
        'importer.errors.importHashExistent',
      );
    }

    const dataToCreate = {
      ...data,
      importHash,
    };

    return this.create(dataToCreate);
  }

  async _isImportHashExistent(importHash) {
    const count = await TaskInstanceRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
