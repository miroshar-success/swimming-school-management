import { IServiceOptions } from './IServiceOptions';
import Error400 from '../errors/Error400';
import FileRepository from '../database/repositories/fileRepository';
import MongooseRepository from '../database/repositories/mongooseRepository';
import Policy from '../database/models/policy';
import PolicyRepository from '../database/repositories/policyRepository';
import TagRefRepository from '../database/repositories/tagRefRepository';
import UserRepository from '../database/repositories/userRepository';
import Error404 from '../errors/Error404';
import TagRefService from './tagRefService';

export default class PolicyService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      data.attachment =
        await FileRepository.filterIdsInTenant(
          data.attachment,
          { ...this.options, session },
        );

      data.version = 1;

      const record = await PolicyRepository.create(data, {
        ...this.options,
        session,
      });

      await TagRefRepository.save(
        Policy,
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
        'policy',
      );

      throw error;
    }
  }

  async update(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      data.attachment =
        await FileRepository.filterIdsInTenant(
          data.attachment,
          { ...this.options, session },
        );

      const record = await PolicyRepository.update(
        id,
        data,
        {
          ...this.options,
          session,
        },
      );

      await TagRefRepository.save(
        Policy,
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
        'policy',
      );

      throw error;
    }
  }

  async tags(id, data) {
    const dbId = await PolicyRepository.filterIdInTenant(
      id,
      this.options,
    );

    if (!dbId) {
      throw new Error404();
    }

    await new TagRefService(this.options).save(
      Policy,
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
        await PolicyRepository.destroy(id, {
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
    return PolicyRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return PolicyRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return PolicyRepository.findAndCountAll(
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
    const count = await PolicyRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
