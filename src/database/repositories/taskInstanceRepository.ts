import { IRepositoryOptions } from './IRepositoryOptions';
import AuditLogRepository from './auditLogRepository';
import Error404 from '../../errors/Error404';
import FileRepository from './fileRepository';
import lodash from 'lodash';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import MongooseRepository from './mongooseRepository';
import NoteRepository from './noteRepository';
import TagRefRepository from './tagRefRepository';
import Task from '../models/task';
import TaskInstance from '../models/taskInstance';
import TaskRepository from './taskRepository';
import UserRepository from './userRepository';

class TaskInstanceRepository {
  static async ownAttachments(
    attachments,
    taskId,
    options: IRepositoryOptions,
  ) {
    if (!attachments || !taskId) {
      return;
    }

    const task = await TaskRepository.findById(
      taskId,
      options,
    );

    return attachments.filter(
      (id) =>
        !task.attachments.find(
          (attachment) =>
            attachment._id.toHexString() ===
            id.toHexString(),
        ),
    );
  }

  static async create(data, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const [record] = await TaskInstance(
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

    await FileRepository.assignRelatedData(
      await this.ownAttachments(
        data.attachments,
        record.task,
        options,
      ),
      {
        type: FileRepository.TYPE_TASK_INSTANCE,
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
        TaskInstance(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await TaskInstance(options.database).updateOne(
      { _id: id },
      {
        ...data,
        updatedBy:
          MongooseRepository.getCurrentUser(options).id,
      },
      options,
    );

    await FileRepository.assignRelatedData(
      await this.ownAttachments(
        data.attachments,
        record.task,
        options,
      ),
      {
        type: FileRepository.TYPE_TASK_INSTANCE,
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
        TaskInstance(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await TaskInstance(options.database).deleteOne(
      { _id: id },
      options,
    );

    await FileRepository.releaseRelatedData(
      {
        type: FileRepository.TYPE_TASK_INSTANCE,
        typeId: id,
      },
      options,
    );

    await TagRefRepository.destroy(
      TaskInstance,
      null,
      id,
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      record,
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

    const records = await TaskInstance(options.database)
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
      TaskInstance(options.database).countDocuments({
        ...filter,
        tenant: currentTenant.id,
      }),
      options,
    );
  }

  static async findById(
    id,
    options: IRepositoryOptions,
    metaOnly = false,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        TaskInstance(options.database)
          .findOne({ _id: id, tenant: currentTenant.id })
          .populate('task')
          .populate('taskList')
          .populate({
            path: 'notes',
            populate: ['createdBy'].join(' '),
          })
          .populate('priority')
          .populate({
            path: 'owner',
            populate: ['avatars'].join(' '),
          })
          .populate({
            path: 'approver',
            populate: ['avatars'].join(' '),
          })
          .populate({
            path: 'newsArticles',
            select: [
              '_id',
              'title',
              'link',
              'date',
              'tenant',
            ],
          })
          .populate({
            path: 'products',
            select: ['_id', 'title', 'tenant'],
          })
          .populate({
            path: 'policyTemplates',
            select: ['_id', 'name', 'tenant'],
          })
          .populate({
            path: 'attachments',
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
      metaOnly,
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
      if (filter.task) {
        criteriaAnd.push({
          ['task']: MongooseQueryUtils.uuid(filter.task),
        });
      }

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

      if (filter.priority) {
        criteriaAnd.push({
          priority: MongooseQueryUtils.uuid(
            filter.priority,
          ),
        });
      }

      if (filter.repeat) {
        criteriaAnd.push({
          repeat: filter.repeat,
        });
      }

      if (filter.status) {
        criteriaAnd.push({
          status: filter.status,
        });
      }

      if (filter.owner) {
        criteriaAnd.push({
          owner: MongooseQueryUtils.uuid(filter.owner),
        });
      }

      if (filter.approver) {
        criteriaAnd.push({
          approver: MongooseQueryUtils.uuid(
            filter.approver,
          ),
        });
      }

      if (filter.dueDateRange) {
        const [start, end] = filter.dueDateRange;

        if (
          start !== undefined &&
          start !== null &&
          start !== ''
        ) {
          criteriaAnd.push({
            dueDate: {
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
            dueDate: {
              $lte: end,
            },
          });
        }
      }

      if (filter.completedDateRange) {
        const [start, end] = filter.completedDateRange;

        if (
          start !== undefined &&
          start !== null &&
          start !== ''
        ) {
          criteriaAnd.push({
            completedDate: {
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
            completedDate: {
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

      if (filter.tags) {
        criteriaAnd.push({
          _id: {
            $in: await TagRefRepository.filterIds(
              Task,
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

    let rows = await TaskInstance(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate('task')
      .populate('taskList')
      .populate('priority')
      .populate({
        path: 'owner',
        populate: ['avatars'].join(' '),
      })
      .populate({
        path: 'approver',
        populate: ['avatars'].join(' '),
      });

    const count = await TaskInstance(
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

    const sort = MongooseQueryUtils.sort('title_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    const records = await TaskInstance(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record.title,
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
        entityName: TaskInstance(options.database)
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
    metaOnly = true,
  ) {
    if (!record) {
      return null;
    }

    const output = record.toObject
      ? record.toObject()
      : record;

    output.owner =
      await UserRepository.cleanupForRelationships(
        output.owner,
        options,
      );

    output.approver =
      await UserRepository.cleanupForRelationships(
        output.approver,
        options,
      );

    output.tags = await TagRefRepository.assignTags(
      output.repeat === 'Never' ? Task : TaskInstance,
      null,
      output.repeat === 'Never' ? output.task : output.id,
      options,
    );

    if (metaOnly) {
      return output;
    }

    output.createdBy =
      await UserRepository.cleanupForRelationships(
        output.createdBy,
        options,
      );

    output.attachments =
      await FileRepository.cleanupForRelationships(
        output.attachments,
        options,
      );

    output.notes =
      await NoteRepository.cleanupForRelationships(
        output.notes,
        options,
        false,
      );

    return output;
  }
}

export default TaskInstanceRepository;
