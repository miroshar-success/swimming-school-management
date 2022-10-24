import { IRepositoryOptions } from './IRepositoryOptions';
import AuditLogRepository from './auditLogRepository';
import Error404 from '../../errors/Error404';
import FileRepository from './fileRepository';
import lodash from 'lodash';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import MongooseRepository from './mongooseRepository';
import TagRefRepository from './tagRefRepository';
import UserRepository from './userRepository';
import Vendor from '../models/vendor';
import TaskRepository from './taskRepository';
import RiskRepository from './riskRepository';

class VendorRepository {
  static async create(data, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const [record] = await Vendor(options.database).create(
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

    await FileRepository.assignRelatedData(
      [...data.contract, ...data.documentation],
      {
        type: FileRepository.TYPE_VENDOR,
        typeId: record.id,
        typeTitle: record.title,
      },
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
        Vendor(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await Vendor(options.database).updateOne(
      { _id: id },
      {
        ...data,
        updatedBy:
          MongooseRepository.getCurrentUser(options).id,
      },
      options,
    );

    await FileRepository.assignRelatedData(
      [...data.contract, ...data.documentation],
      {
        type: FileRepository.TYPE_VENDOR,
        typeId: record.id,
        typeTitle: record.title,
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
        Vendor(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await Vendor(options.database).deleteOne(
      { _id: id },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      record,
      options,
    );

    await FileRepository.releaseRelatedData(
      { type: FileRepository.TYPE_VENDOR, typeId: id },
      options,
    );

    await TagRefRepository.destroy(
      Vendor,
      null,
      record.id,
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

    const records = await Vendor(options.database)
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
      Vendor(options.database).countDocuments({
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
        Vendor(options.database)
          .findOne({ _id: id, tenant: currentTenant.id })
          .populate('category')
          .populate('risks')
          .populate('tasks')
          .populate('logo')
          .populate({
            path: 'contract',
            populate: ['uploader'].join(' '),
          })
          .populate({
            path: 'documentation',
            populate: ['uploader'].join(' '),
          })
          .populate({
            path: 'createdBy',
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
      false,
    );
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
    metaOnly = true,
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

      if (filter.referenceRange) {
        const [start, end] = filter.referenceRange;

        if (
          start !== undefined &&
          start !== null &&
          start !== ''
        ) {
          criteriaAnd.push({
            reference: {
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
            reference: {
              $lte: end,
            },
          });
        }
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

      if (filter.status) {
        criteriaAnd.push({
          status: filter.status,
        });
      }

      if (filter.category) {
        criteriaAnd.push({
          category: MongooseQueryUtils.uuid(
            filter.category,
          ),
        });
      }

      if (filter.rating) {
        criteriaAnd.push({
          rating: filter.rating,
        });
      }

      if (filter.primaryContactName) {
        criteriaAnd.push({
          primaryContactName: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.primaryContactName,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.primaryContactEmail) {
        criteriaAnd.push({
          primaryContactEmail: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.primaryContactEmail,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.countryOfIncorporation) {
        criteriaAnd.push({
          countryOfIncorporation:
            filter.countryOfIncorporation,
        });
      }

      if (filter.dataProcessed) {
        criteriaAnd.push({
          dataProcessed: { $all: filter.dataProcessed },
        });
      }

      if (filter.industry) {
        criteriaAnd.push({
          industry: filter.industry,
        });
      }

      if (filter.internalBusinessSponsor) {
        criteriaAnd.push({
          internalBusinessSponsor: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.internalBusinessSponsor,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.website) {
        criteriaAnd.push({
          website: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.website,
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

      if (filter.tags) {
        criteriaAnd.push({
          _id: {
            $in: await TagRefRepository.filterIds(
              Vendor,
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

    let rows: any = [];

    if (!filter?.export && metaOnly) {
      rows = await Vendor(options.database)
        .find(criteria)
        .skip(skip)
        .limit(limitEscaped)
        .sort(sort)
        .populate('category')
        .populate('risks')
        .populate('tasks');
    } else {
      rows = await Vendor(options.database)
        .find(criteria)
        .skip(skip)
        .limit(limitEscaped)
        .sort(sort)
        .populate('category')
        .populate('risks')
        .populate('tasks')
        .populate('logo')
        .populate({
          path: 'contract',
          populate: ['uploader'].join(' '),
        })
        .populate({
          path: 'documentation',
          populate: ['uploader'].join(' '),
        })
        .populate({
          path: 'createdBy',
          populate: ['avatars'].join(' '),
        });
    }

    const count = await Vendor(
      options.database,
    ).countDocuments(criteria);

    rows = await Promise.all(
      rows.map(
        async (row) =>
          await this._mapRelationshipsAndFillDownloadUrl(
            row,
            options,
            !filter?.export && metaOnly,
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
          {
            name: {
              $regex:
                MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            },
          },
        ],
      });
    }

    const sort = MongooseQueryUtils.sort('name_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    const records = await Vendor(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record.name,
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
        entityName: Vendor(options.database).modelName,
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
    metaOnly = true,
  ) {
    if (!record) {
      return null;
    }

    const output = record.toObject
      ? record.toObject()
      : record;

    output.tags = await TagRefRepository.assignTags(
      Vendor,
      null,
      output.id,
      options,
    );

    if (metaOnly) {
      return output;
    }

    output.logo =
      await FileRepository.cleanupForRelationships(
        output.logo,
        options,
      );

    output.createdBy =
      await UserRepository.cleanupForRelationships(
        output.createdBy,
        options,
      );

    output.contract =
      await FileRepository.cleanupForRelationships(
        output.contract,
        options,
      );

    output.documentation =
      await FileRepository.cleanupForRelationships(
        output.documentation,
        options,
      );

    output.openTasks = await TaskRepository.count(
      {
        _id: { $in: output.tasks.map((v) => v.id) },
        status: { $ne: 'Complete' },
      },
      options,
    );

    output.openRisks = await RiskRepository.count(
      {
        _id: { $in: output.risks.map((v) => v.id) },
        status: 'Open',
      },
      options,
    );

    return output;
  }
}

export default VendorRepository;
