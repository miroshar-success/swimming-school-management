import { IRepositoryOptions } from './IRepositoryOptions';
import AuditLogRepository from './auditLogRepository';
import Document from '../models/file';
import Error404 from '../../errors/Error404';
import FileRepository from './fileRepository';
import lodash from 'lodash';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import MongooseRepository from './mongooseRepository';
import Policy from '../models/policy';
import Risk from '../models/risk';
import TagRefRepository from './tagRefRepository';
import Task from '../models/task';
import TaskInstance from '../models/taskInstance';
import UserRepository from './userRepository';
import Vendor from '../models/vendor';

class DocumentRepository {
  static TYPE_MODELS = {
    [FileRepository.TYPE_RISK]: Risk,
    [FileRepository.TYPE_TASK]: Task,
    [FileRepository.TYPE_TASK_INSTANCE]: TaskInstance,
    [FileRepository.TYPE_VENDOR]: Vendor,
    [FileRepository.TYPE_POLICY]: Policy,
  };

  static async update(
    id,
    data,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        Document(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
          isTemp: false,
          isAttached: true,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await Document(options.database).updateOne(
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
        Document(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
          isTemp: false,
          isAttached: true,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await Document(options.database).deleteOne(
      { _id: id },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      record,
      options,
    );

    if (record.type === FileRepository.TYPE_VENDOR) {
      await MongooseRepository.destroyRelationToMany(
        id,
        Vendor(options.database),
        'contract',
        options,
      );
      await MongooseRepository.destroyRelationToMany(
        id,
        Vendor(options.database),
        'documentation',
        options,
      );
    } else if (record.type === FileRepository.TYPE_TASK) {
      await MongooseRepository.destroyRelationToMany(
        id,
        Task(options.database),
        'attachments',
        options,
      );
      await MongooseRepository.destroyRelationToMany(
        id,
        TaskInstance(options.database),
        'attachments',
        options,
      );
    } else if (this.TYPE_MODELS[record.type]) {
      await MongooseRepository.destroyRelationToMany(
        id,
        this.TYPE_MODELS[record.type](options.database),
        'attachments',
        options,
      );
    }
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

    const records = await Document(options.database)
      .find({
        _id: { $in: ids },
        tenant: currentTenant.id,
      })
      .select(['_id']);

    return records.map((record) => record._id);
  }

  static async count(filter, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    return MongooseRepository.wrapWithSessionIfExists(
      Document(options.database).countDocuments({
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
        Document(options.database)
          .findOne({
            _id: id,
            tenant: currentTenant.id,
            isTemp: false,
            isAttached: true,
          })
          .populate({
            path: 'uploader',
            populate: ['avatars'].join(' '),
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

    let criteriaAnd: any = [
      {
        tenant: currentTenant.id,
        isTemp: false,
        isAttached: true,
      },
    ];

    if (filter) {
      if (filter.id) {
        criteriaAnd.push({
          ['_id']: MongooseQueryUtils.uuid(filter.id),
        });
      }

      if (filter.type) {
        criteriaAnd.push({ type: filter.type });
      }

      if (filter.uploader) {
        criteriaAnd.push({
          uploader: MongooseQueryUtils.uuid(
            filter.uploader,
          ),
        });
      }

      ['title', 'typeTitle', 'name'].forEach((field) => {
        if (filter[field]) {
          criteriaAnd.push({
            [field]: {
              $regex: MongooseQueryUtils.escapeRegExp(
                filter[field],
              ),
              $options: 'i',
            },
          });
        }
      });

      if (filter.extension) {
        const exts = filter.extension
          .split(/[ ]*,[ ]*/)
          .filter((ext) => ext.trim() !== '');

        if (exts.length > 0) {
          criteriaAnd.push({
            name: {
              $in: exts.map(
                (ext) => new RegExp(`.${ext.trim()}$`, 'i'),
              ),
            },
          });
        }
      }

      if (filter.sizeRange) {
        const [start, end] = filter.sizeRange;
        if (
          start !== undefined &&
          start !== null &&
          start !== ''
        ) {
          criteriaAnd.push({
            sizeInBytes: {
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
            sizeInBytes: {
              $lte: end,
            },
          });
        }
      }

      if (filter.uploadedAtRange) {
        const [start, end] = filter.uploadedAtRange;

        if (
          start !== undefined &&
          start !== null &&
          start !== ''
        ) {
          criteriaAnd.push({
            ['uploadedAt']: {
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
            ['uploadedAt']: {
              $lte: end,
            },
          });
        }
      }

      if (filter.tags) {
        criteriaAnd.push({
          _id: {
            $in: await TagRefRepository.filterIds(
              Document,
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

    let rows = await Document(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate({
        path: 'uploader',
        populate: ['avatars'].join(' '),
      });

    const count = await Document(
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

  static async _createAuditLog(
    action,
    id,
    data,
    options: IRepositoryOptions,
  ) {
    await AuditLogRepository.log(
      {
        entityName: Document(options.database).modelName,
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

    output.uploader =
      await UserRepository.cleanupForRelationships(
        output.uploader,
        options,
      );

    output.tags = await TagRefRepository.assignTags(
      Document,
      null,
      output.id,
      options,
    );

    return output;
  }
}

export default DocumentRepository;
