import { IServiceOptions } from './IServiceOptions';
import Error400 from '../errors/Error400';
import Error404 from '../errors/Error404';
import FileRepository from '../database/repositories/fileRepository';
import MongooseRepository from '../database/repositories/mongooseRepository';
import NewsArticleRepository from '../database/repositories/newsArticleRepository';
import NoteRepository from '../database/repositories/noteRepository';
import PolicyRepository from '../database/repositories/policyRepository';
import PolicyTemplateRepository from '../database/repositories/policyTemplateRepository';
import ProductRepository from '../database/repositories/productRepository';
import Risk from '../database/models/risk';
import RiskCategoryRepository from '../database/repositories/riskCategoryRepository';
import RiskRepository from '../database/repositories/riskRepository';
import TagRefRepository from '../database/repositories/tagRefRepository';
import TagRefService from './tagRefService';
import TaskRepository from '../database/repositories/taskRepository';
import UserRepository from '../database/repositories/userRepository';

export default class RiskService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async assignRelatedData(data, session) {
    data.category =
      await RiskCategoryRepository.filterIdInTenant(
        data.category,
        { ...this.options, session },
      );
    data.owner = await UserRepository.filterIdInTenant(
      data.owner,
      { ...this.options, session },
    );
    data.tasks = await TaskRepository.filterIdsInTenant(
      data.tasks,
      { ...this.options, session },
    );
    data.notes = await NoteRepository.filterIdsInTenant(
      data.notes,
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
      const lastRisk = await RiskRepository.findAndCountAll(
        { filter: {}, orderBy: 'reference_DESC', limit: 1 },
        { ...this.options, session },
      );
      data.reference =
        Number(lastRisk.rows[0]?.reference ?? 0) + 1;

      await this.assignRelatedData(data, session);

      const record = await RiskRepository.create(data, {
        ...this.options,
        session,
      });

      await TagRefRepository.save(
        Risk,
        null,
        record.id,
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
        'risk',
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

      const record = await RiskRepository.update(id, data, {
        ...this.options,
        session,
      });

      await TagRefRepository.save(
        Risk,
        null,
        record.id,
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
        'risk',
      );

      throw error;
    }
  }

  async tags(id, data) {
    const dbId = await RiskRepository.filterIdInTenant(
      id,
      this.options,
    );

    if (!dbId) {
      throw new Error404();
    }

    await new TagRefService(this.options).save(
      Risk,
      dbId,
      data.tags,
    );
    return dbId;
  }

  async destroyAll(ids) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      for (const id of ids) {
        await RiskRepository.destroy(id, {
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
    return RiskRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return RiskRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return RiskRepository.findAndCountAll(
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
    const count = await RiskRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
