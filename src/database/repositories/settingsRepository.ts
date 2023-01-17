import MongooseRepository from './mongooseRepository';
import Settings from '../models/settings';
import AuditLogRepository from './auditLogRepository';
import FileRepository from './fileRepository';
import { IRepositoryOptions } from './IRepositoryOptions';
import TenantRepository from './tenantRepository';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import Error404 from '../../errors/Error404';

export default class SettingsRepository {
  static async find(options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    return this._fillFileDownloadUrls(
      await MongooseRepository.wrapWithSessionIfExists(
        Settings(options.database)
          .findOne({
            tenant: currentTenant.id,
          })
          .populate('logos')
          .populate('backgroundImages')
          .populate('openingHours')
          .populate('photographs'),
        options,
      ),
      options,
    );
  }

  static async findOrCreateDefault(
    defaults,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const first =
      await MongooseRepository.wrapWithSessionIfExists(
        Settings(options.database)
          .findOne({
            tenant: currentTenant.id,
          })
          .populate('logos')
          .populate('backgroundImages')
          .populate('openingHours')
          .populate('photographs'),
        options,
      );

    if (first) {
      return this._fillFileDownloadUrls(first, options);
    }

    const [settings] = await Settings(
      options.database,
    ).create(
      [
        {
          ...defaults,
          tenant: currentTenant.id,
          createdBy: MongooseRepository.getCurrentUser(
            options,
          )
            ? MongooseRepository.getCurrentUser(options).id
            : null,
          name: currentTenant.name,
        },
      ],
      options,
    );

    return this._fillFileDownloadUrls(settings, options);
  }

  static async save(data, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const record =
      await MongooseRepository.wrapWithSessionIfExists(
        Settings(options.database).findOne({
          tenant: currentTenant.id,
        }),
        options,
      );

    await TenantRepository.update(
      currentTenant.id,
      { name: data.name },
      options,
    );

    await Settings(options.database).updateOne(
      { _id: record.id },
      { ...data, tenant: currentTenant.id },
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'settings',
        entityId: record.id,
        action: AuditLogRepository.UPDATE,
        values: data,
      },
      options,
    );

    return this._fillFileDownloadUrls(
      await MongooseRepository.wrapWithSessionIfExists(
        Settings(options.database).findById(record.id),
        options,
      ),
      options,
    );
  }

  static async findById(id, options) {
    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        Settings(options.database)
          .findOne({
            _id: id,
          })
          .populate('logos')
          .populate('backgroundImages')
          .populate('openingHours')
          .populate('photographs'),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    const school = await this._fillFileDownloadUrls(
      record,
      options,
    );

    return school;
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
  ) {
    let criteriaAnd: any = [];

    console.log(filter);

    if (filter) {
      if (filter.id) {
        criteriaAnd.push({
          ['_id']: MongooseQueryUtils.uuid(filter.id),
        });
      }

      if (filter.name) {
        criteriaAnd.push({
          name: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.name,
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

      if (filter.conditions) {
        criteriaAnd.push({
          ['condition']: {
            $in: filter.conditions,
          },
        });
      }

      if (filter.towns) {
        criteriaAnd.push({
          ['town']: {
            $in: filter.towns,
          },
        });
      }

      if (filter.cafe === 'true') {
        criteriaAnd.push({
          ['cafe']: true,
        });
      }

      if (filter.parkingLot === 'true') {
        criteriaAnd.push({
          ['parkingLot']: true,
        });
      }

      if (filter.balletParking === 'true') {
        criteriaAnd.push({
          ['balletParking']: true,
        });
      }

      if (filter.waitingRoom === 'true') {
        criteriaAnd.push({
          ['waitingRoom']: true,
        });
      }

      if (filter.gym === 'true') {
        criteriaAnd.push({
          ['gym']: true,
        });
      }

      if (filter.bathRoom === 'true') {
        criteriaAnd.push({
          ['bathRoom']: true,
        });
      }

      if (filter.wateringCan === 'true') {
        criteriaAnd.push({
          ['wateringCan']: true,
        });
      }

      if (filter.dressingRoom === 'true') {
        criteriaAnd.push({
          ['dressingRoom']: true,
        });
      }
    }

    const sort = MongooseQueryUtils.sort(
      orderBy || 'name_ASC',
    );

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length
      ? { $and: criteriaAnd }
      : null;

    let rows =
      await MongooseRepository.wrapWithSessionIfExists(
        Settings(options.database)
          .find(criteria)
          .skip(skip)
          .limit(limitEscaped)
          .sort(sort)
          .populate('logos')
          .populate('backgroundImages')
          .populate('openingHours')
          .populate('photographs'),
        options,
      );

    const count = await Settings(
      options.database,
    ).countDocuments(criteria);

    rows = await Promise.all(
      rows.map((row) =>
        this._fillFileDownloadUrls(row, options),
      ),
    );

    return { rows, count };
  }

  static async _fillFileDownloadUrls(record, options) {
    if (!record) {
      return null;
    }

    const output = record.toObject
      ? record.toObject()
      : record;

    output.logos =
      await FileRepository.cleanupForRelationships(
        output.logos,
        options,
      );

    output.backgroundImages =
      await FileRepository.cleanupForRelationships(
        output.backgroundImages,
        options,
      );

    output.photographs =
      await FileRepository.cleanupForRelationships(
        output.photographs,
        options,
      );

    console.log(output);

    return output;
  }
}
