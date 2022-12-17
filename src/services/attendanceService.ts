import Error400 from '../errors/Error400';
import MongooseRepository from '../database/repositories/mongooseRepository';
import { IServiceOptions } from './IServiceOptions';
import AttendanceUserRepository from '../database/repositories/attendanceUserRepository';
import LessonRepository from '../database/repositories/lessonRepository';
import Lesson from '../database/models/lesson';
import { Mongoose } from 'mongoose';

export default class AttendanceService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      const record = await AttendanceUserRepository.create(
        id,
        data,
        {
          ...this.options,
          session,
        },
      );

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'attendance',
      );

      throw error;
    }
  }

  async listLessons({ filter }) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      const lessons = await Lesson(this.options.database)
        .find({ day: new Date().getDay() })
        .populate('class')
        .toObject();

      await MongooseRepository.commitTransaction(session);

      let result: Array<any> = [];

      if (filter) {
        let first = 0;
        let last = 0;
        let current = 0;
        if (filter === 'finished') {
          for (let i = 0; i < lessons.length; i++) {
            last =
              first + lessons[i].class.duration * 60 * 1000;
            current =
              new Date().getTime() % (3600 * 1000 * 24);
            if (last < current) result.push(lessons[i]);
          }
        } else if (filter === 'progress') {
          for (let i = 0; i < lessons.length; i++) {
            first =
              lessons[i].time.getTime() %
              (3600 * 1000 * 24);
            last =
              first + lessons[i].class.duration * 60 * 1000;
            current =
              new Date().getTime() % (3600 * 1000 * 24);
            if (first <= current && current <= last)
              result.push(lessons[i]);
          }
        } else if (filter === 'upcoming') {
          for (let i = 0; i < lessons.length; i++) {
            first =
              lessons[i].time.getTime() %
              (3600 * 1000 * 24);
            last =
              first + lessons[i].class.duration * 60 * 1000;
            current =
              new Date().getTime() % (3600 * 1000 * 24);
            if (current < first) result.push(lessons[i]);
          }
        }
        return result;
      } else return (result = lessons);
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  async destroyAll(ids) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      for (const id of ids) {
        await AttendanceUserRepository.destroy(
          id,
          this.options.currentUser.id,
          {
            ...this.options,
            session,
          },
        );
      }

      await MongooseRepository.commitTransaction(session);
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  async findById(id) {
    return AttendanceUserRepository.findById(
      id,
      this.options,
    );
  }
}
