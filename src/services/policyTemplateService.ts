import { IServiceOptions } from './IServiceOptions';
import Error400 from '../errors/Error400';
import Error404 from '../errors/Error404';
import FileRepository from '../database/repositories/fileRepository';
import MongooseRepository from '../database/repositories/mongooseRepository';
import PolicyTemplate from '../database/models/policyTemplate';
import PolicyTemplateRepository from '../database/repositories/policyTemplateRepository';
import TagRefRepository from '../database/repositories/tagRefRepository';
import TagRefService from './tagRefService';

export default class PolicyTemplateService {
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

      const record = await PolicyTemplateRepository.create(
        data,
        {
          ...this.options,
          session,
        },
      );

      await TagRefRepository.save(
        PolicyTemplate,
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
        'policyTemplate',
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

      const record = await PolicyTemplateRepository.update(
        id,
        data,
        {
          ...this.options,
          session,
        },
      );

      await TagRefRepository.save(
        PolicyTemplate,
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
        'policyTemplate',
      );

      throw error;
    }
  }

  async tags(id, data) {
    const dbId =
      await PolicyTemplateRepository.filterIdInTenant(
        id,
        this.options,
      );

    if (!dbId) {
      throw new Error404();
    }

    await new TagRefService(this.options).save(
      PolicyTemplate,
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
        await PolicyTemplateRepository.destroy(id, {
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
    return PolicyTemplateRepository.findById(
      id,
      this.options,
    );
  }

  async findAllAutocomplete(search, limit) {
    return PolicyTemplateRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return PolicyTemplateRepository.findAndCountAll(
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
    const count = await PolicyTemplateRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
