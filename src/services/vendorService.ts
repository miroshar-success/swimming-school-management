import { IServiceOptions } from './IServiceOptions';
import Error400 from '../errors/Error400';
import Error404 from '../errors/Error404';
import FileRepository from '../database/repositories/fileRepository';
import MongooseRepository from '../database/repositories/mongooseRepository';
import RiskRepository from '../database/repositories/riskRepository';
import TagRefService from './tagRefService';
import TaskRepository from '../database/repositories/taskRepository';
import Vendor from '../database/models/vendor';
import VendorCategoryRepository from '../database/repositories/vendorCategoryRepository';
import VendorRepository from '../database/repositories/vendorRepository';
import TagRefRepository from '../database/repositories/tagRefRepository';

export default class VendorService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async assignRelatedData(data, session) {
    data.category =
      await VendorCategoryRepository.filterIdInTenant(
        data.category.id ?? data.category,
        { ...this.options, session },
      );
    data.risks = await RiskRepository.filterIdsInTenant(
      data.risks.map((risk) => risk.id ?? risk),
      { ...this.options, session },
    );
    data.tasks = await TaskRepository.filterIdsInTenant(
      data.tasks.map((task) => task.id ?? task),
      { ...this.options, session },
    );
    data.logo = await FileRepository.filterIdsInTenant(
      data.logo,
      { ...this.options, session },
    );
    data.contract = await FileRepository.filterIdsInTenant(
      data.contract,
      {
        ...this.options,
        session,
      },
    );
    data.documentation =
      await FileRepository.filterIdsInTenant(
        data.documentation,
        { ...this.options, session },
      );
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      const lastVendor =
        await VendorRepository.findAndCountAll(
          {
            filter: {},
            orderBy: 'reference_DESC',
            limit: 1,
          },
          { ...this.options, session },
        );

      data.reference =
        Number(lastVendor.rows[0]?.reference ?? 0) + 1;

      await this.assignRelatedData(data, session);

      const keys = Object.keys(data);
      for (const key of keys) {
        if (data[key] === '') {
          data[key] = null;
        }
      }

      const record = await VendorRepository.create(data, {
        ...this.options,
        session,
      });

      await TagRefRepository.save(
        Vendor,
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
        'vendor',
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

      const record = await VendorRepository.update(
        id,
        data,
        {
          ...this.options,
          session,
        },
      );

      await TagRefRepository.save(
        Vendor,
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
        'vendor',
      );

      throw error;
    }
  }

  async tags(id, data) {
    const dbId = await VendorRepository.filterIdInTenant(
      id,
      this.options,
    );

    if (!dbId) {
      throw new Error404();
    }

    await new TagRefService(this.options).save(
      Vendor,
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
        await VendorRepository.destroy(id, {
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
    return VendorRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return VendorRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return VendorRepository.findAndCountAll(
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
    const count = await VendorRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
