import MongooseRepository from '../mongooseRepository';
import MongooseQueryUtils from '../../utils/mongooseQueryUtils';
import { IRepositoryOptions } from '../IRepositoryOptions';
import Task from '../../models/task';
import TaskRepository from '../taskRepository';

class TaskRepositoryEx extends TaskRepository {
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

    const records = await Task(options.database).aggregate(
      params,
    );

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

    let rows = await Task(options.database)
      .find(rawFilter)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate('taskList')
      .populate({
        path: 'notes',
        populate: ['createdBy'].join(' '),
      })
      .populate('priority')
      .populate('owner')
      .populate('approver');

    const count = await Task(
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
}

export default TaskRepositoryEx;
