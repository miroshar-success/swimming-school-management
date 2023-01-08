import { IServiceOptions } from '../IServiceOptions';
import UserRepository from '../../database/repositories/userRepository';
import moment from 'moment';

export default class StudentsForStatisticsService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async totalNewStudentPerMonth() {
    const result = await UserRepository.findAndCountAll(
      {
        filter: {
          createdAt: {
            $gte: moment(
              `${moment().year()}-01-01 00:00:00`,
            ),
          },
        },
      },
      'student',
      this.options,
    );

    const students = result.rows;

    let total = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < students.length; i++) {
      total[moment(students.createdAt).month()]++;
    }

    return total;
  }
}
