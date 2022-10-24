import Error400 from '../errors/Error400';
import MongooseRepository from '../database/repositories/mongooseRepository';
import { IServiceOptions } from './IServiceOptions';
import NewsFavoriteRepository from '../database/repositories/newsFavoriteRepository';
import NewsArticleRepository from '../database/repositories/newsArticleRepository';
import UserRepository from '../database/repositories/userRepository';

export default class NewsFavoriteService {
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
      data.newsArticle =
        await NewsArticleRepository.filterIdInTenant(
          data.newsArticle,
          { ...this.options, session },
        );

      const record = await NewsFavoriteRepository.create(
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
        'newsFavorite',
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
      data.newsArticle =
        await NewsArticleRepository.filterIdInTenant(
          data.newsArticle,
          { ...this.options, session },
        );

      const record = await NewsFavoriteRepository.update(
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
        'newsFavorite',
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
        await NewsFavoriteRepository.destroy(id, {
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

  async toggle(newsArticleId) {
    const favoriteId =
      await NewsFavoriteRepository.filterIdByNewsArticle(
        newsArticleId,
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
      newsArticle: newsArticleId,
    };

    return await this.create(data);
  }

  async findById(id) {
    return NewsFavoriteRepository.findById(
      id,
      this.options,
    );
  }

  async findAllAutocomplete(search, limit) {
    return NewsFavoriteRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return NewsFavoriteRepository.findAndCountAll(
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
    const count = await NewsFavoriteRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
