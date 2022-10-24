import AuditLog from '../models/auditLog';
import MongooseRepository from './mongooseRepository';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import { IRepositoryOptions } from './IRepositoryOptions';

export default class AuditLogRepository {
  static get CREATE() {
    return 'create';
  }
  static get UPDATE() {
    return 'update';
  }
  static get DELETE() {
    return 'delete';
  }

  /**
   * Saves an Audit Log to the database.
   *
   * @param  {Object} log - The log being saved.
   * @param  {string} log.entityName - The name of the entity. Ex.: customer
   * @param  {string} log.entityId - The id of the entity.
   * @param  {string} log.action - The action [create, update or delete].
   * @param  {Object} log.values - The JSON log value with data of the entity.
   *
   * @param  {Object} options
   * @param  {Object} options.session - The current database session.
   * @param  {Object} options.currentUser - The current logged user.
   * @param  {Object} options.currentTenant - The current currentTenant.
   */
  static async log(
    { entityName, entityId, action, values },
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const [log] = await AuditLog(options.database).create(
      [
        {
          entityName,
          entityId,
          tenantId: currentTenant.id,
          action,
          values,
          timestamp: new Date(),
          createdById:
            options && options.currentUser
              ? options.currentUser.id
              : null,
          createdByEmail:
            options && options.currentUser
              ? options.currentUser.email
              : null,
        },
      ],
      options,
    );

    return log;
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
  ) {
    const tenant =
      MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: any = [];

    criteriaAnd.push({
      tenantId: tenant.id,
    });

    if (filter) {
      if (filter.timestampRange) {
        const [start, end] = filter.timestampRange;

        if (
          start !== undefined &&
          start !== null &&
          start !== ''
        ) {
          criteriaAnd.push({
            ['timestamp']: {
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
            ['timestamp']: {
              $lte: end,
            },
          });
        }
      }

      if (filter.action) {
        criteriaAnd.push({
          ['action']: filter.action,
        });
      }

      if (filter.entityId) {
        criteriaAnd.push({
          ['entityId']: filter.entityId,
        });
      }

      if (filter.createdByEmail) {
        criteriaAnd.push({
          ['createdByEmail']: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.createdByEmail,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.entityNames && filter.entityNames.length) {
        criteriaAnd.push({
          ['entityName']: {
            $in: filter.entityNames,
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
    const rows = await AuditLog(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort);

    const count = await AuditLog(
      options.database,
    ).countDocuments(criteria);

    return { rows, count };
  }
}
