import { IRepositoryOptions } from './IRepositoryOptions';
import AuditLogRepository from './auditLogRepository';
import Error404 from '../../errors/Error404';
import File from '../models/file';
import FileStorage from '../../services/file/fileStorage';
import lodash from 'lodash';
import MongooseRepository from './mongooseRepository';
import UserRepository from './userRepository';
import TagRefRepository from './tagRefRepository';

export default class FileRepository {
  static TYPE_INTERNAL = 'internal';
  static TYPE_TASK = 'task';
  static TYPE_TASK_INSTANCE = 'taskInstance';
  static TYPE_RISK = 'risk';
  static TYPE_VENDOR = 'vendor';
  static TYPE_POLICY = 'policy';

  static async assignRelatedData(
    ids,
    { type, typeId, typeTitle },
    options: IRepositoryOptions,
  ) {
    if (typeId) {
      await this.releaseRelatedData(
        {
          type,
          typeId,
        },
        options,
      );
    }
    await File(options.database).updateMany(
      { _id: { $in: ids } },
      {
        isTemp: false,
        isAttached: true,
        type,
        typeId,
        typeTitle,
      },
      options,
    );
  }

  static async releaseRelatedData(
    filter,
    options: IRepositoryOptions,
  ) {
    await File(options.database).updateMany(
      filter,
      { type: null, typeId: null, typeTitle: null },
      options,
    );
  }

  static async create(data, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const [record] = await File(options.database).create(
      [
        {
          ...data,
          isTemp: true,
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
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    await File(options.database).updateOne(
      { _id: id },
      {
        ...data,
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

    return this.findById(id, options);
  }

  static async findById(id, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        File(options.database)
          .findOne({
            _id: id,
            tenant: currentTenant.id,
          })
          .populate('uploader'),
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

  static async filterIdInTenant(
    file,
    options: IRepositoryOptions,
  ) {
    return lodash.get(
      await this.filterIdsInTenant([file], options),
      '[0]',
      null,
    );
  }

  static async filterIdsInTenant(
    files,
    options: IRepositoryOptions,
  ) {
    if (!files || !files.length) {
      return [];
    }

    // const currentTenant =
    //   MongooseRepository.getCurrentTenant(options);

    const records = await File(options.database)
      .find({
        _id: { $in: files.map((file) => file.id || file) },
        // tenant: currentTenant.id,
      })
      .select(['_id']);

    await Promise.all(
      files
        .filter((file) => Boolean(file.id && file.new))
        .map(
          async (file) =>
            await this.update(
              file.id,
              {
                title: file.title,
              },
              options,
            ),
        ),
    );

    await Promise.all(
      files
        .filter((file) => Boolean(file.id && file.tags))
        .map(
          async (file) =>
            await TagRefRepository.save(
              File,
              null,
              file.id,
              file.tags,
              options,
            ),
        ),
    );

    return records.map((record) => record._id);
  }

  static async _createAuditLog(
    action,
    id,
    data,
    options: IRepositoryOptions,
  ) {
    await AuditLogRepository.log(
      {
        entityName: File(options.database).modelName,
        entityId: id,
        action,
        values: data,
      },
      options,
    );
  }

  static async cleanupForRelationships(
    attachments,
    options: IRepositoryOptions,
    metaOnly = false,
  ) {
    if (!attachments) {
      return attachments;
    }
    const records = Array.isArray(attachments)
      ? attachments
      : [attachments];
    return await Promise.all(
      records.map(
        async (record) =>
          await this._mapRelationshipsAndFillDownloadUrl(
            record,
            options,
            metaOnly,
          ),
      ),
    );
  }

  static async _mapRelationshipsAndFillDownloadUrl(
    record,
    options: IRepositoryOptions,
    metaOnly = true,
  ) {
    if (!record) {
      return null;
    }

    const output = record.toObject
      ? record.toObject()
      : record;

    let downloadUrl;

    if (record.publicUrl) {
      downloadUrl = record.publicUrl;
    } else {
      downloadUrl = await FileStorage.downloadUrl(
        record.name,
        record.privateUrl,
      );
    }

    output.downloadUrl = downloadUrl;

    if (metaOnly) {
      return output;
    }

    output.uploader =
      await UserRepository.cleanupForRelationships(
        output.uploader,
        options,
      );

    output.tags = await TagRefRepository.assignTags(
      File,
      null,
      output.id,
      options,
    );

    return output;
  }
}
