import { IRepositoryOptions } from './IRepositoryOptions';
import AuditLogRepository from './auditLogRepository';
import Error404 from '../../errors/Error404';
import lodash from 'lodash';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import MongooseRepository from './mongooseRepository';
import Tag from '../models/tag';
import TagRef from '../models/tagRef';

class TagRepository {
  static async create(data, options: IRepositoryOptions) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const dbRecord = await TagRepository.findByTag(
      data.tag ?? '',
      options,
      true,
    );

    if (dbRecord) {
      return dbRecord;
    }

    const [record] = await Tag(options.database).create(
      [
        {
          tag: (data.tag ?? '').trim().toLowerCase(),
          user: currentUser.id,
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
    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        Tag(options.database).findOne({
          _id: id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    const currentUser =
      MongooseRepository.getCurrentUser(options);

    await Tag(options.database).updateOne(
      { _id: id },
      {
        tag: (data.tag ?? '').trim().toLowerCase(),
        user: currentUser.id,
        updatedBy: currentUser.id,
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
    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        Tag(options.database).findOne({
          _id: id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await Tag(options.database).deleteOne(
      { _id: id },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      record,
      options,
    );

    await MongooseRepository.destroyRelationToMany(
      id,
      TagRef(options.database),
      'tags',
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
    autoCreate = true,
  ) {
    if (!ids || !ids.length) {
      return [];
    }

    const filteredIds: any[] = [];

    for (const id of ids) {
      if (!id) {
        continue;
      }
      // Check if the tag ID is valid
      if (
        MongooseQueryUtils.isValidObjectId(id.toLowerCase())
      ) {
        if (!filteredIds.includes(id.toLowerCase())) {
          filteredIds.push(id.toLowerCase());
        }
        continue;
      }
      // Otherwise create a new tag.
      if (!autoCreate) {
        continue;
      }
      const record = await TagRepository.create(
        { tag: id },
        options,
      );
      if (!filteredIds.includes(record.id.toLowerCase())) {
        filteredIds.push(record.id.toLowerCase());
      }
    }

    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const records = await Tag(options.database)
      .find({
        _id: { $in: filteredIds },
        user: currentUser.id,
      })
      .select(['_id']);

    const dbIds = records.map((record) =>
      record.id.toLowerCase(),
    );

    return filteredIds.filter((id) =>
      dbIds.includes(id.toLowerCase()),
    );
  }

  static async replaceIds(
    tags,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const records = await Tag(options.database)
      .find({
        tag: {
          $in: tags.map((tag) => tag.toLowerCase()),
        },
        user: MongooseQueryUtils.uuid(currentUser.id),
      })
      .select(['_id', 'tag']);

    return tags.map(
      (tag) =>
        records.find(
          (record) => record.tag === tag.toLowerCase(),
        )?.id || tag.toLowerCase(),
    );
  }

  static async count(filter, options: IRepositoryOptions) {
    return MongooseRepository.wrapWithSessionIfExists(
      Tag(options.database).countDocuments({
        ...filter,
      }),
      options,
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        Tag(options.database).findOne({
          _id: id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    return this._mapRelationshipsAndFillDownloadUrl(record);
  }

  static async findByTag(
    tag,
    options: IRepositoryOptions,
    skipError = false,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);
    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        Tag(options.database).findOne({
          tag: tag.trim().toLowerCase(),
          user: currentUser.id,
        }),
        options,
      );

    if (!record) {
      if (skipError) {
        return null;
      }
      throw new Error404();
    }

    return this._mapRelationshipsAndFillDownloadUrl(record);
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    let criteriaAnd: any = [
      {
        ['user']: currentUser.id,
      },
    ];

    if (filter) {
      if (filter.id) {
        criteriaAnd.push({
          ['_id']: MongooseQueryUtils.uuid(filter.id),
        });
      }

      if (filter.tag) {
        criteriaAnd.push({
          tag: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.tag,
            ),
            $options: 'i',
          },
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

    let rows = await Tag(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort);

    const count = await Tag(
      options.database,
    ).countDocuments(criteria);

    rows = await Promise.all(
      rows.map(this._mapRelationshipsAndFillDownloadUrl),
    );

    return { rows, count };
  }

  static async findAllAutocomplete(
    search,
    limit,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    let criteriaAnd: Array<any> = [
      {
        user: currentUser.id,
      },
    ];

    if (search) {
      criteriaAnd.push({
        $or: [
          {
            _id: MongooseQueryUtils.uuid(search),
          },
          {
            tag: {
              $regex:
                MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            },
          },
        ],
      });
    }

    const sort = MongooseQueryUtils.sort('tag_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = criteriaAnd.length
      ? { $and: criteriaAnd }
      : {};

    const records = await Tag(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      tag: record.tag,
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
        entityName: Tag(options.database).modelName,
        entityId: id,
        action,
        values: data,
      },
      options,
    );
  }

  static async _mapRelationshipsAndFillDownloadUrl(record) {
    if (!record) {
      return null;
    }

    const output = record.toObject
      ? record.toObject()
      : record;

    return output;
  }

  static async cleanupForRelationships(tags) {
    if (!tags) {
      return tags;
    }
    const records = Array.isArray(tags) ? tags : [tags];
    return records.map((record) => ({
      id: record.id,
      tag: record.tag,
    }));
  }
}

export default TagRepository;
