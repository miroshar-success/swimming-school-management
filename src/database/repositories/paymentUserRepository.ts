import MongooseRepository from './mongooseRepository';
import AuditLogRepository from './auditLogRepository';
import User from '../models/user';
import { IRepositoryOptions } from './IRepositoryOptions';

export default class PaymentUserRepository {
  static async findById(id, options: IRepositoryOptions) {
    let user =
      await MongooseRepository.wrapWithSessionIfExists(
        User(options.database).findOne({
          payments: { $elemMatch: { _id: id } },
        }),
        options,
      );

    if (!user) {
      return null;
    }

    user = user.toObject ? user.toObject() : user;

    const paymentUser = user.payments.find(
      (userPayment) => {
        return userPayment._id === id;
      },
    );

    return {
      ...paymentUser,
      user,
    };
  }

  static async create(
    userId,
    payment,
    options: IRepositoryOptions,
  ) {
    await User(options.database).updateMany(
      { _id: userId },
      {
        $push: {
          payments: {
            category: payment.category || null,
            paymentMethod: payment.paymentMethod || null,
            price: payment.price || null,
            quantity: payment.quantity || null,
            VAT: payment.VAT || null,
            cost: payment.cost || null,
            month: payment.month || null,
            lessonsNumber: payment.lessonsNumber || null,
          },
        },
      },
      options,
    );
  }

  static async destroy(
    paymentId,
    id,
    options: IRepositoryOptions,
  ) {
    const user =
      await MongooseRepository.wrapWithSessionIfExists(
        User(options.database).findById(id),
        options,
      );

    await User(options.database).updateOne(
      { _id: id },
      {
        $pull: {
          payments: { _id: paymentId },
        },
      },
      options,
    );
  }
}
