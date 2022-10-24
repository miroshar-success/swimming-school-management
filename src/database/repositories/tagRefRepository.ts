import { IRepositoryOptions } from './IRepositoryOptions';
import AuditLogRepository from './auditLogRepository';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import MongooseRepository from './mongooseRepository';
import TagRef from '../models/tagRef';
import TagRepository from './tagRepository';

class TagRefRepository {
  static async _criteria(
    filter,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const criteriaAnd: any = [
      {
        user: currentUser.id,
      },
    ];

    if (filter) {
      if (
        filter.entity &&
        typeof filter.entity === 'function'
      ) {
        criteriaAnd.push({
          entityName: filter.entity(options.database)
            .modelName,
        });
      }

      if (filter.entityName) {
        criteriaAnd.push({
          entityName: filter.entityName,
        });
      }

      if (
        MongooseQueryUtils.isValidObjectId(filter.entityId)
      ) {
        criteriaAnd.push({
          entityId: filter.entityId,
        });
      }

      if (filter.tags && Array.isArray(filter.tags)) {
        criteriaAnd.push({
          tags: {
            $all: filter.tags.map((tag) =>
              MongooseQueryUtils.uuid(tag),
            ),
          },
        });
      }
    }

    return criteriaAnd.length
      ? { $and: criteriaAnd }
      : null;
  }

  static async _createAuditLog(
    action,
    id,
    data,
    options: IRepositoryOptions,
  ) {
    await AuditLogRepository.log(
      {
        entityName: TagRef(options.database).modelName,
        entityId: id,
        action,
        values: data,
      },
      options,
    );
  }

  static async save(
    entity,
    entityName,
    entityId,
    tags,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    // Filter tags
    const filteredTags =
      await TagRepository.filterIdsInTenant(tags, options);

    // Find existing tag ref
    const refId = await TagRefRepository.find(
      entity,
      entityName,
      entityId,
      options,
    );

    // Build up tag ref data
    const data = {
      user: currentUser.id,
      entityName:
        (entity &&
          typeof entity === 'function' &&
          entity(options.database).modelName) ||
        entityName,
      entityId,
      tags: filteredTags,
    };

    return refId
      ? await this.update(refId, data, options)
      : await this.create(data, options);
  }

  static async create(data, options: IRepositoryOptions) {
    const [record] = await TagRef(options.database).create(
      [data],
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.CREATE,
      record.id,
      data,
      options,
    );

    return true;
  }

  static async update(
    id,
    data,
    options: IRepositoryOptions,
  ) {
    await TagRef(options.database).updateOne(
      { _id: id },
      data,
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      id,
      data,
      options,
    );

    return true;
  }

  static async destroy(
    entity,
    entityName,
    entityId,
    options: IRepositoryOptions,
  ) {
    const criteria = await this._criteria(
      {
        entity,
        entityName,
        entityId,
      },
      options,
    );

    const record =
      await MongooseRepository.wrapWithSessionIfExists(
        TagRef(options.database).findOne(criteria),
        options,
      );

    if (!record) {
      return;
    }

    await TagRef(options.database).deleteOne(
      criteria,
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      record.id,
      record,
      options,
    );
  }

  static async find(
    entity,
    entityName,
    entityId,
    options: IRepositoryOptions,
  ) {
    const record =
      await MongooseRepository.wrapWithSessionIfExists(
        TagRef(options.database)
          .findOne(
            await this._criteria(
              {
                entity,
                entityName,
                entityId,
              },
              options,
            ),
          )
          .select(['_id']),
        options,
      );
    return record && record.id;
  }

  static async filterIds(
    entity,
    entityName,
    tags,
    options: IRepositoryOptions,
  ) {
    const dbTags = await TagRepository.replaceIds(
      tags,
      options,
    );

    const records = await TagRef(options.database)
      .find(
        await this._criteria(
          {
            entity,
            entityName,
            tags: dbTags,
          },
          options,
        ),
      )
      .select(['entityId']);

    return records.map((record) => record.entityId);
  }

  static async assignTags(
    entity,
    entityName,
    entityId,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const record = await TagRef(options.database)
      .findOne(
        await this._criteria(
          {
            entity,
            entityName,
            entityId,
          },
          options,
        ),
      )
      .select(['tags'])
      .populate({
        path: 'tags',
        match: { user: currentUser.id },
        select: ['_id', 'tag'].join(' '),
      });

    return record?.tags || [];
  }
}

export default TagRefRepository;
