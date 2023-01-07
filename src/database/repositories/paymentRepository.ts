import MongooseRepository from './mongooseRepository';
import AuditLogRepository from './auditLogRepository';
import User from '../models/user';
import Payment from '../models/payment';
import { IRepositoryOptions } from './IRepositoryOptions';
import Error404 from '../../errors/Error404';

export default class PaymentRepository {
  static async findById(id, options: IRepositoryOptions) {
    let payment =
      await MongooseRepository.wrapWithSessionIfExists(
        Payment(options.database)
          .findOne({
            $elemMatch: { _id: id },
          })
          .populate('user')
          .populate('category')
          .populate('paymentMethod'),
        options,
      );

    if (!payment) {
      return null;
    }

    payment = payment.toObject
      ? payment.toObject()
      : payment;

    return payment;
  }

  static async create(
    userId,
    payment,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const paymentInstance = await Payment(
      options.database,
    ).create(
      [
        {
          ...payment,
          tenant: currentTenant,
          student: userId,
        },
      ],
      options,
    );

    await User(options.database).updateMany(
      { _id: userId },
      {
        $push: {
          payments: paymentInstance.id,
        },
      },
      options,
    );
  }

  static async destroy(
    paymentId,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);
    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        Payment(options.database).findOne({
          _id: paymentId,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await User(options.database).updateOne(
      { _id: record.student },
      {
        $pull: {
          payments: record.id,
        },
      },
      options,
    );

    await Payment(options.database).deleteOne({
      _id: paymentId,
    });
  }
}
