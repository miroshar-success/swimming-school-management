import MongooseRepository from './mongooseRepository';
import Settings from '../models/settings';
import AuditLogRepository from './auditLogRepository';
import FileRepository from './fileRepository';
import { IRepositoryOptions } from './IRepositoryOptions';

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
          .populate('backgroundImages'),
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
          .populate('backgroundImages'),
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

    return output;
  }
}
