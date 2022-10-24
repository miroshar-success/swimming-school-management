import moment from 'moment';
import { IServiceOptions } from '../IServiceOptions';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import MongooseQueryUtils from '../../database/utils/mongooseQueryUtils';
import TaskRepositoryEx from '../../database/repositories/extend/taskRepositoryEx';
import TaskInstanceRepositoryEx from '../../database/repositories/extend/taskInstanceRepositoryEx';

export default class RecurringTasksService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async recurring() {
    return {
      testing: 'okay',
    };
  }
}
