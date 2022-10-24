import { IServiceOptions } from '../IServiceOptions';
import TaskInstanceRepository from '../../database/repositories/taskInstanceRepository';

export default class UpcomingTasksService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async get() {
    const result =
      await TaskInstanceRepository.findAndCountAll(
        {
          filter: {
            dueDateRange: [Date.now(), null],
            status: {
              $ne: 'Complete',
            },
          },
          limit: 5,
          orderBy: 'dueDate_ASC',
        },
        this.options,
      );

    return result.rows ?? [];
  }
}
