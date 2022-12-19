import MongooseRepository from './mongooseRepository';
import AuditLogRepository from './auditLogRepository';
import User from '../models/user';
import { IRepositoryOptions } from './IRepositoryOptions';
import moment from 'moment';

export default class AttendanceUserRepository {
  static async exist(
    userId,
    lessonId,
    options: IRepositoryOptions,
  ) {
    let user =
      await MongooseRepository.wrapWithSessionIfExists(
        User(options.database).findOne({
          _id: userId,
          attendances: {
            $elemMatch: {
              lesson: lessonId,
              time: moment().format('YYYY-MM-DD'),
            },
          },
        }),
        options,
      );

    if (!user) {
      return false;
    }
    return true;
  }

  static async create(
    userId,
    lessonId,
    options: IRepositoryOptions,
  ) {
    const exist = await this.exist(
      userId,
      lessonId,
      options,
    );
    if (!exist) {
      await User(options.database).updateOne(
        { _id: userId },
        {
          $push: {
            attendances: {
              lesson: lessonId || null,
              time: moment().format('YYYY-MM-DD'),
              isAttended: true,
            },
          },
        },
        options,
      );
    }
  }

  static async destroy(
    attendanceId,
    userId,
    options: IRepositoryOptions,
  ) {
    const user =
      await MongooseRepository.wrapWithSessionIfExists(
        User(options.database).findById(userId),
        options,
      );

    await User(options.database).updateOne(
      { _id: userId },
      {
        $pull: {
          attendances: { _id: attendanceId },
        },
      },
      options,
    );
  }
}
