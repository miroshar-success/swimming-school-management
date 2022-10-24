import MongooseRepository from '../mongooseRepository';
import MongooseQueryUtils from '../../utils/mongooseQueryUtils';
import { IRepositoryOptions } from '../IRepositoryOptions';
import TaskInstance from '../../models/taskInstance';
import TaskInstanceRepository from '../taskInstanceRepository';
import AuditLogRepository from '../auditLogRepository';
import DateTimeUtils from '../../../utils/dateTimeUtils';
import moment from 'moment';

class TaskInstanceRepositoryEx extends TaskInstanceRepository {
  static async aggregate(
    {
      addFields,
      matches,
      group,
      sorts,
      limit = 0,
      skip = 0,
    }: any,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const params: any[] = [];

    if (addFields) {
      params.push({
        $addFields: {
          ...addFields,
        },
      });
    }

    params.push({
      $match: {
        tenant: MongooseQueryUtils.ObjectId(
          currentTenant.id,
        ),
        ...matches,
      },
    });

    if (group) {
      params.push({
        $group: {
          ...group,
        },
      });
    }

    if (sorts) {
      params.push({
        $sort: {
          ...sorts,
        },
      });
    }

    if (limit) {
      params.push({
        $limit: (skip ?? 0) + limit,
      });
    }

    if (skip) {
      params.push({
        $skip: skip,
      });
    }

    const records = await TaskInstance(
      options.database,
    ).aggregate(params);

    return records;
  }

  static async rawFindAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const rawFilter = {
      $and: [
        {
          tenant: currentTenant.id,
        },
        filter,
      ],
    };

    const sort = MongooseQueryUtils.sort(
      orderBy || 'createdAt_DESC',
    );

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;

    let rows = await TaskInstance(options.database)
      .find(rawFilter)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate('task')
      .populate('taskList')
      .populate({
        path: 'notes',
        populate: ['createdBy'].join(' '),
      })
      .populate('priority')
      .populate('owner')
      .populate('approver');

    const count = await TaskInstance(
      options.database,
    ).countDocuments(rawFilter);

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

  static async updateMany(
    filter,
    data,
    options: IRepositoryOptions,
  ) {
    const result = await TaskInstance(
      options.database,
    ).updateMany(
      filter,
      {
        ...data,
        updatedBy:
          MongooseRepository.getCurrentUser(options).id,
      },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      null,
      data,
      options,
    );

    return result.modifiedCount ?? true;
  }

  static async destroyMany(filter, options) {
    const taskInstances =
      await TaskInstanceRepositoryEx.rawFindAndCountAll(
        { filter },
        options,
      );
    for (const taskInstance of taskInstances.rows) {
      await TaskInstanceRepositoryEx.destroy(
        taskInstance._id,
        options,
      );
    }
  }

  static async createDefaults(
    data,
    task,
    options: IRepositoryOptions,
  ) {
    if (!data || !task || !task.dueDate) {
      return;
    }
    const recurrenceDates = DateTimeUtils.RecurrenceDates(
      task.repeat,
      task.dueDate,
      3,
    );

    for (let i = 0; i < recurrenceDates.length; i++) {
      await TaskInstanceRepositoryEx.create(
        {
          ...data,
          dueDate: recurrenceDates[i],
          task: task._id,
        },
        options,
      );
    }
  }

  static async updateFutureInstance(
    task,
    data,
    options: IRepositoryOptions,
  ) {
    const { rows, count } =
      await TaskInstanceRepositoryEx.findAndCountAll(
        {
          filter: {
            task,
            dueDateRange: [moment(), null],
          },
        },
        options,
      );
    for (const row of rows) {
      await TaskInstanceRepositoryEx.update(
        row.id,
        {
          status: data.status,
        },
        options,
      );
    }
  }
}

export default TaskInstanceRepositoryEx;
