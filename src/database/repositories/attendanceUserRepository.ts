import MongooseRepository from './mongooseRepository';
import AuditLogRepository from './auditLogRepository';
import User from '../models/user';
import { IRepositoryOptions } from './IRepositoryOptions';

export default class AttendanceUserRepository {
  static async findById(id, options: IRepositoryOptions) {
    let user =
      await MongooseRepository.wrapWithSessionIfExists(
        User(options.database).findOne({
          attendances: { $elemMatch: { _id: id } },
        }),
        options,
      );

    if (!user) {
      return null;
    }

    user = user.toObject ? user.toObject() : user;

    const attendanceUser = user.attendances.find(
      (userAttendance) => {
        return userAttendance._id === id;
      },
    );

    return {
      ...attendanceUser,
      user,
    };
  }

  static async create(
    attendance,
    user,
    options: IRepositoryOptions,
  ) {
    await User(options.database).updateMany(
      { _id: user.id },
      {
        $push: {
          attendances: {
            class: attendance.class || null,
            time: attendance.time || null,
            isAttended: attendance.isAttended || null,
          },
        },
      },
      options,
    );
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
