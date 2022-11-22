import { IServiceOptions } from './IServiceOptions';
import Error400 from '../errors/Error400';
import Error404 from '../errors/Error404';
import MongooseRepository from '../database/repositories/mongooseRepository';
import UserRepository from '../database/repositories/userRepository';
import ClassRepository from '../database/repositories/classRepository';
import LessonRepository from '../database/repositories/lessonRepository';

export default class LessonService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async assignRelatedData(data, session) {
    data.class = await ClassRepository.filterIdInTenant(
      data.class.id ?? data.class,
      { ...this.options, session },
    );
    data.teacher = await UserRepository.filterIdInTenant(
      data.teacher.id ?? data.teacher,
      { ...this.options, session },
    );
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      await this.assignRelatedData(data, session);

      const keys = Object.keys(data);
      for (const key of keys) {
        if (data[key] === '') {
          data[key] = null;
        }
      }

      const record = await LessonRepository.create(data, {
        ...this.options,
        session,
      });

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'lesson',
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

      const keys = Object.keys(data);
      for (const key of keys) {
        if (data[key] === '') {
          data[key] = null;
        }
      }

      const record = await LessonRepository.update(
        id,
        data,
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
        'lesson',
      );

      throw error;
    }
  }

  async destroyAll(ids) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      for (const id of ids) {
        await LessonRepository.destroy(id, {
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
    return LessonRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return LessonRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return LessonRepository.findAndCountAll(
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
    const count = await LessonRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
