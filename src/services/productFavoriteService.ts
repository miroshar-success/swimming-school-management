import { IServiceOptions } from './IServiceOptions';
import Error400 from '../errors/Error400';
import MongooseRepository from '../database/repositories/mongooseRepository';
import ProductFavoriteRepository from '../database/repositories/productFavoriteRepository';
import ProductRepository from '../database/repositories/productRepository';
import UserRepository from '../database/repositories/userRepository';

export default class ProductFavoriteService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      data.user = await UserRepository.filterIdInTenant(
        data.user,
        { ...this.options, session },
      );
      data.product =
        await ProductRepository.filterIdInTenant(
          data.product,
          { ...this.options, session },
        );

      const record = await ProductFavoriteRepository.create(
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
        'productFavorite',
      );

      throw error;
    }
  }

  async update(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      data.user = await UserRepository.filterIdInTenant(
        data.user,
        { ...this.options, session },
      );
      data.product =
        await ProductRepository.filterIdInTenant(
          data.product,
          { ...this.options, session },
        );

      const record = await ProductFavoriteRepository.update(
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
        'productFavorite',
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
        await ProductFavoriteRepository.destroy(id, {
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

  async toggle(productId) {
    const favoriteId =
      await ProductFavoriteRepository.filterIdByProduct(
        productId,
        this.options,
      );

    if (favoriteId) {
      await this.destroyAll([favoriteId]);
      return true;
    }

    const currentUser = MongooseRepository.getCurrentUser(
      this.options,
    );

    const data = {
      user: currentUser.id,
      product: productId,
    };

    return await this.create(data);
  }

  async findById(id) {
    return ProductFavoriteRepository.findById(
      id,
      this.options,
    );
  }

  async findAllAutocomplete(search, limit) {
    return ProductFavoriteRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return ProductFavoriteRepository.findAndCountAll(
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
    const count = await ProductFavoriteRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
