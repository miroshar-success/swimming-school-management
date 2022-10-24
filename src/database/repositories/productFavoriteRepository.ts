import { IRepositoryOptions } from './IRepositoryOptions';
import AuditLogRepository from './auditLogRepository';
import Error404 from '../../errors/Error404';
import lodash from 'lodash';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import MongooseRepository from './mongooseRepository';
import ProductFavorite from '../models/productFavorite';
import UserRepository from './userRepository';

class ProductFavoriteRepository {
  static async create(data, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const [record] = await ProductFavorite(
      options.database,
    ).create(
      [
        {
          ...data,
          tenant: currentTenant.id,
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
        ProductFavorite(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await ProductFavorite(options.database).updateOne(
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
        ProductFavorite(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await ProductFavorite(options.database).deleteOne(
      { _id: id },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      record,
      options,
    );
  }

  static async destroyByProduct(
    id,
    options: IRepositoryOptions,
  ) {
    await ProductFavorite(options.database).deleteOne(
      { product: id },
      options,
    );
  }

  static async filterIdInTenant(
    id,
    options: IRepositoryOptions,
  ) {
    return lodash.get(
      await this.filterIdsInTenant([id], options),
      '[0]',
      null,
    );
  }

  static async filterIdsInTenant(
    ids,
    options: IRepositoryOptions,
  ) {
    if (!ids || !ids.length) {
      return [];
    }

    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const records = await ProductFavorite(options.database)
      .find({
        _id: { $in: ids },
        tenant: currentTenant.id,
      })
      .select(['_id']);

    return records.map((record) => record._id);
  }

  static async filterIdByProduct(
    productId,
    options: IRepositoryOptions,
  ) {
    return lodash.get(
      await this.filterIdsByProducts([productId], options),
      '[0]',
      null,
    );
  }

  static async filterIdsByProducts(
    productIds,
    options: IRepositoryOptions,
  ) {
    if (!productIds || !productIds.length) {
      return [];
    }

    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const records = await ProductFavorite(options.database)
      .find({
        user: currentUser.id,
        product: { $in: productIds },
        tenant: currentTenant.id,
      })
      .select(['_id']);

    return records.map((record) => record._id);
  }

  static async productsInTenant(
    userId,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const records = await ProductFavorite(options.database)
      .find({
        user: userId || currentUser.id,
        tenant: currentTenant.id,
      })
      .select(['product']);

    return records.map((record) => record.product);
  }

  static async count(filter, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    return MongooseRepository.wrapWithSessionIfExists(
      ProductFavorite(options.database).countDocuments({
        ...filter,
        tenant: currentTenant.id,
      }),
      options,
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        ProductFavorite(options.database)
          .findOne({ _id: id, tenant: currentTenant.id })
          .populate({
            path: 'user',
            populate: ['avatars'].join(' '),
          })
          .populate({
            path: 'product',
            select: ['_id', 'title', 'tenant'].join(' '),
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
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: any = [];

    criteriaAnd.push({
      tenant: currentTenant.id,
    });

    if (filter) {
      if (filter.id) {
        criteriaAnd.push({
          ['_id']: MongooseQueryUtils.uuid(filter.id),
        });
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
    }

    const sort = MongooseQueryUtils.sort(
      orderBy || 'createdAt_DESC',
    );

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length
      ? { $and: criteriaAnd }
      : null;

    let rows = await ProductFavorite(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate({
        path: 'user',
        populate: ['avatars'].join(' '),
      })
      .populate({
        path: 'product',
        select: ['_id', 'title', 'tenant'].join(' '),
      });

    const count = await ProductFavorite(
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
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: Array<any> = [
      {
        tenant: currentTenant.id,
      },
    ];

    if (search) {
      criteriaAnd.push({
        $or: [
          {
            _id: MongooseQueryUtils.uuid(search),
          },
        ],
      });
    }

    const sort = MongooseQueryUtils.sort('id_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    const records = await ProductFavorite(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record.id,
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
        entityName: ProductFavorite(options.database)
          .modelName,
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

    output.user =
      await UserRepository.cleanupForRelationships(
        output.user,
        options,
      );

    return output;
  }
}

export default ProductFavoriteRepository;
