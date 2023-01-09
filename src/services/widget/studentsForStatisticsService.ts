import { IServiceOptions } from '../IServiceOptions';
import UserRepository from '../../database/repositories/userRepository';
import moment from 'moment';

export default class StudentsForStatisticsService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async totalNewStudentsPerMonth() {
    const result = await UserRepository.findAndCountAll(
      {
        filter: {
          createdAtRange: [
            moment(`${moment().year()}-01-01 00:00:00`),
            moment(),
          ],
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

  async countMaleAndFemale() {
    const male = await UserRepository.findAndCountAll(
      {
        filter: {
          sex: 'male',
        },
      },
      'student',
      this.options,
    );

    const female = await UserRepository.findAndCountAll(
      {
        filter: {
          sex: 'female',
        },
      },
      'student',
      this.options,
    );

    return {
      countMale: male.count,
      countFemale: female.count,
    };
  }

  async totalStudentsByAge() {
    const result = await UserRepository.findAndCountAll(
      {
        filter: {},
      },
      'student',
      this.options,
    );

    const students = result.rows;

    let total = [0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < students.length; i++) {
      total[
        Math.floor(
          (moment().year() -
            moment(students[i].birthday).year()) /
            10,
        )
      ]++;
    }

    return total;
  }

  async maxAttendanceDay() {
    const result = await UserRepository.findAndCountAll(
      {
        filter: {},
      },
      'student',
      this.options,
    );

    const students = result.rows;

    let total = [0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < students.length; i++) {
      for (let j = 0; j < students[i].lessons.length; j++) {
        total[students[i].lessons[j].day]++;
      }
    }

    const number = Math.max(...total);

    const day = total.indexOf(number);

    return { day, number };
  }

  async totalStudents() {
    const result = await UserRepository.findAndCountAll(
      {
        filter: {},
      },
      'student',
      this.options,
    );

    return { total: result.count };
  }

  async totalTeachers() {
    const result = await UserRepository.findAndCountAll(
      {
        filter: {},
      },
      'teacher',
      this.options,
    );

    return { total: result.count };
  }

  async totalManagers() {
    const result = await UserRepository.findAndCountAll(
      {
        filter: {},
      },
      'admin',
      this.options,
    );

    return { total: result.count };
  }

  async totalUsers() {
    const result = await UserRepository.findAndCountAll(
      {
        filter: {},
      },
      'all',
      this.options,
    );

    return { total: result.count };
  }
}
