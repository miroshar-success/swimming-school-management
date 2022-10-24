import Error404 from '../../../errors/Error404';
import TaskPriority from '../../models/taskPriority';
import MongooseQueryUtils from '../../utils/mongooseQueryUtils';
import { IRepositoryOptions } from '../IRepositoryOptions';
import MongooseRepository from '../mongooseRepository';
import TaskPriorityRepository from '../taskPriorityRepository';

class TaskPriorityRepositoryEx extends TaskPriorityRepository {
  static DEFAULT_PRIORITY = 'Medium';
  static DEFAULT_PRIORITY_NAMES = [
    'None',
    'Low',
    'Medium',
    'High',
    'Critical',
  ];

  static async defaultPriority(
    options: IRepositoryOptions,
  ) {
    return await this.findByPriority(
      this.DEFAULT_PRIORITY,
      options,
    );
  }

  static async findByPriority(
    priority,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        TaskPriority(options.database).findOne({
          priority: priority,
          tenant: currentTenant.id,
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

  static async buildUpDefaultRecords(
    options: IRepositoryOptions,
  ) {
    const defaultPriorities =
      await TaskPriorityRepositoryEx.rawFindAndCountAll(
        {
          filter: {
            $in: ['$priority', this.DEFAULT_PRIORITY_NAMES],
          },
        },
        options,
      );

    let order = 0;

    for (const priorityName of this
      .DEFAULT_PRIORITY_NAMES) {
      if (
        defaultPriorities.rows.find(
          (priority) => priority.priority === priorityName,
        )
      ) {
        continue;
      }
      await TaskPriorityRepositoryEx.create(
        {
          priority: priorityName,
          system: true,
          order,
        },
        options,
      );
      order++;
    }
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

    let rows = await TaskPriority(options.database)
      .find(rawFilter)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort);

    const count = await TaskPriority(
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

export default TaskPriorityRepositoryEx;
