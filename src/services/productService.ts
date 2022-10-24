import { IServiceOptions } from './IServiceOptions';
import Error400 from '../errors/Error400';
import Error404 from '../errors/Error404';
import FileRepository from '../database/repositories/fileRepository';
import MongooseRepository from '../database/repositories/mongooseRepository';
import Product from '../database/models/product';
import ProductCategoryRepository from '../database/repositories/productCategoryRepository';
import ProductRepository from '../database/repositories/productRepository';
import TagRefRepository from '../database/repositories/tagRefRepository';
import TagRefService from './tagRefService';

export default class ProductService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      const lastProduct =
        await ProductRepository.findAndCountAll(
          {
            filter: {},
            orderBy: 'reference_DESC',
            limit: 1,
          },
          { ...this.options, session },
        );
      data.logo = await FileRepository.filterIdsInTenant(
        data.logo,
        { ...this.options, session },
      );
      data.reference =
        Number(lastProduct.rows[0]?.reference ?? 0) + 1;
      data.category =
        await ProductCategoryRepository.filterIdInTenant(
          data.category,
          { ...this.options, session },
        );

      const record = await ProductRepository.create(data, {
        ...this.options,
        session,
      });

      await TagRefRepository.save(
        Product,
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
        'product',
      );

      throw error;
    }
  }

  async update(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      data.logo = await FileRepository.filterIdsInTenant(
        data.logo,
        { ...this.options, session },
      );
      data.category =
        await ProductCategoryRepository.filterIdInTenant(
          data.category,
          { ...this.options, session },
        );

      const record = await ProductRepository.update(
        id,
        data,
        {
          ...this.options,
          session,
        },
      );

      await TagRefRepository.save(
        Product,
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
        'product',
      );

      throw error;
    }
  }

  async tags(id, data) {
    const dbId = await ProductRepository.filterIdInTenant(
      id,
      this.options,
    );

    if (!dbId) {
      throw new Error404();
    }

    await new TagRefService(this.options).save(
      Product,
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
        await ProductRepository.destroy(id, {
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
    return ProductRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return ProductRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return ProductRepository.findAndCountAll(
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
    const count = await ProductRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
