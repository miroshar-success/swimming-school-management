import { IRepositoryOptions } from './IRepositoryOptions';
import AuditLogRepository from './auditLogRepository';
import Error404 from '../../errors/Error404';
import lodash from 'lodash';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import MongooseRepository from './mongooseRepository';
import NewsArticle from '../models/newsArticle';
import NewsFavoriteRepository from './newsFavoriteRepository';
import Risk from '../models/risk';
import TagRefRepository from './tagRefRepository';
import Task from '../models/task';
import TaskInstance from '../models/taskInstance';

class NewsArticleRepository {
  static async create(data, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const [record] = await NewsArticle(
      options.database,
    ).create(
      [
        {
          ...data,
          tenant: currentTenant.id,
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        },
      ],
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.CREATE,
      record.id,
      data,
      options,
    );

    return this.findById(record.id, options);
  }

  static async update(
    id,
    data,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        NewsArticle(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await NewsArticle(options.database).updateOne(
      { _id: id },
      {
        ...data,
        updatedBy:
          MongooseRepository.getCurrentUser(options).id,
      },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      id,
      data,
      options,
    );

    record = await this.findById(id, options);

    return record;
  }

  static async destroy(id, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        NewsArticle(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await NewsArticle(options.database).deleteOne(
      { _id: id },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      record,
      options,
    );

    await NewsFavoriteRepository.destroyByNewsArticle(
      id,
      options,
    );

    await MongooseRepository.destroyRelationToMany(
      id,
      Task(options.database),
      'newsArticles',
      options,
    );

    await MongooseRepository.destroyRelationToMany(
      id,
      TaskInstance(options.database),
      'newsArticles',
      options,
    );

    await MongooseRepository.destroyRelationToMany(
      id,
      Risk(options.database),
      'newsArticles',
      options,
    );

    await TagRefRepository.destroy(
      NewsArticle,
      null,
      record.id,
      options,
    );
  }

  static async filterIdInTenant(
    id,
    options: IRepositoryOptions,
    ignoreTenant = true,
  ) {
    return lodash.get(
      await this.filterIdsInTenant(
        [id],
        options,
        ignoreTenant,
      ),
      '[0]',
      null,
    );
  }

  static async filterIdsInTenant(
    ids,
    options: IRepositoryOptions,
    ignoreTenant = true,
  ) {
    if (!ids || !ids.length) {
      return [];
    }

    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const records = await NewsArticle(options.database)
      .find({
        _id: { $in: ids },
        ...(ignoreTenant
          ? {}
          : { tenant: currentTenant.id }),
      })
      .select(['_id']);

    return records.map((record) => record._id);
  }

  static async count(filter, options: IRepositoryOptions) {
    return MongooseRepository.wrapWithSessionIfExists(
      NewsArticle(options.database).countDocuments({
        ...filter,
      }),
      options,
    );
  }

  static async findById(
    id,
    options: IRepositoryOptions,
    ignoreTenant = false,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        NewsArticle(options.database).findOne({
          _id: id,
          ...(ignoreTenant
            ? {}
            : { tenant: currentTenant.id }),
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    return this._mapRelationshipsAndFillDownloadUrl(
      record,
      options,
    );
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
    ignoreTenant = true,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: any = [
      !ignoreTenant && { tenant: currentTenant.id },
    ].filter(Boolean);

    if (filter) {
      if (filter.id) {
        criteriaAnd.push({
          ['_id']: MongooseQueryUtils.uuid(filter.id),
        });
      }

      if (filter.title) {
        criteriaAnd.push({
          title: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.title,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.link) {
        criteriaAnd.push({
          link: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.link,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.description) {
        criteriaAnd.push({
          description: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.description,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.dateRange) {
        const [start, end] = filter.dateRange;

        if (
          start !== undefined &&
          start !== null &&
          start !== ''
        ) {
          criteriaAnd.push({
            date: {
              $gte: start,
            },
          });
        }

        if (
          end !== undefined &&
          end !== null &&
          end !== ''
        ) {
          criteriaAnd.push({
            date: {
              $lte: end,
            },
          });
        }
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (
          start !== undefined &&
          start !== null &&
          start !== ''
        ) {
          criteriaAnd.push({
            ['createdAt']: {
              $gte: start,
            },
          });
        }

        if (
          end !== undefined &&
          end !== null &&
          end !== ''
        ) {
          criteriaAnd.push({
            ['createdAt']: {
              $lte: end,
            },
          });
        }
      }

      if (
        filter.favorites === true ||
        filter.favorites === 'true' ||
        filter.favorites === false ||
        filter.favorites === 'false'
      ) {
        criteriaAnd.push({
          _id: {
            [filter.favorites === true ||
            filter.favorites === 'true'
              ? '$in'
              : '$nin']: await NewsFavoriteRepository.newsArticlesInTenant(
              null,
              options,
            ),
          },
        });
      }

      if (filter.tags) {
        criteriaAnd.push({
          _id: {
            $in: await TagRefRepository.filterIds(
              NewsArticle,
              null,
              filter.tags,
              options,
            ),
          },
        });
      }
    }

    const sort = MongooseQueryUtils.sort(
      orderBy || 'createdAt_DESC',
    );

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length
      ? { $and: criteriaAnd }
      : null;

    let rows = await NewsArticle(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort);

    const count = await NewsArticle(
      options.database,
    ).countDocuments(criteria);

    rows = await Promise.all(
      rows.map(
        async (row) =>
          await this._mapRelationshipsAndFillDownloadUrl(
            row,
            options,
          ),
      ),
    );

    return { rows, count };
  }

  static async findAllAutocomplete(
    search,
    limit,
    options: IRepositoryOptions,
    ignoreTenant = true,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: Array<any> = [
      !ignoreTenant && { tenant: currentTenant.id },
    ].filter(Boolean);

    if (search) {
      criteriaAnd.push({
        $or: [
          {
            _id: MongooseQueryUtils.uuid(search),
          },
          {
            title: {
              $regex:
                MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            },
          },
        ],
      });
    }

    const sort = MongooseQueryUtils.sort('date_DESC');
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = criteriaAnd.length
      ? { $and: criteriaAnd }
      : {};

    const records = await NewsArticle(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record.title,
      link: record.link,
      date: record.date,
    }));
  }

  static async _createAuditLog(
    action,
    id,
    data,
    options: IRepositoryOptions,
  ) {
    await AuditLogRepository.log(
      {
        entityName: NewsArticle(options.database).modelName,
        entityId: id,
        action,
        values: data,
      },
      options,
    );
  }

  static async _mapRelationshipsAndFillDownloadUrl(
    record,
    options: IRepositoryOptions,
  ) {
    if (!record) {
      return null;
    }

    const output = record.toObject
      ? record.toObject()
      : record;

    output.tags = await TagRefRepository.assignTags(
      NewsArticle,
      null,
      record.id,
      options,
    );

    output.favorite =
      await NewsFavoriteRepository.filterIdByNewsArticle(
        output.id,
        options,
      );

    return output;
  }
}

export default NewsArticleRepository;
