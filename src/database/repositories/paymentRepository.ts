import MongooseRepository from './mongooseRepository';
import AuditLogRepository from './auditLogRepository';
import User from '../models/user';
import Payment from '../models/payment';
import { IRepositoryOptions } from './IRepositoryOptions';
import Error404 from '../../errors/Error404';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import UserRepository from './userRepository';

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

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: any = [];

    criteriaAnd.push({
      tenant: currentTenant.id,
    });

    if (filter) {
      if (filter.id) {
        criteriaAnd.push({
          ['_id']: MongooseQueryUtils.uuid(filter.id),
        });
      }

      if (filter.year) {
        criteriaAnd.push({
          year: {
            $eq: filter.year,
          },
        });
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (
          start !== undefined &&
          start !== null &&
          start !== ''
        ) {
          criteriaAnd.push({
            ['createdAt']: {
              $gte: start,
            },
          });
        }

        if (
          end !== undefined &&
          end !== null &&
          end !== ''
        ) {
          criteriaAnd.push({
            ['createdAt']: {
              $lte: end,
            },
          });
        }
      }
    }

    const sort = MongooseQueryUtils.sort(
      orderBy || 'createdAt_DESC',
    );

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length
      ? { $and: criteriaAnd }
      : null;

    let rows = await Payment(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate('tenant')
      .populate('category')
      .populate('paymentMethod');

    const count = await Payment(
      options.database,
    ).countDocuments(criteria);

    rows = await Promise.all(
      rows.map(
        async (row) =>
          await this._mapRelationshipsAndFillDownloadUrl(
            row,
            options,
            false,
          ),
      ),
    );

    return { rows, count };
  }

  static async _mapRelationshipsAndFillDownloadUrl(
    record,
    options: IRepositoryOptions,
    metaOnly = true,
  ) {
    if (!record) {
      return null;
    }

    const output = record.toObject
      ? record.toObject()
      : record;

    if (metaOnly) {
      return output;
    }

    /*output.createdBy =
      await UserRepository.cleanupForRelationships(
        output.createdBy,
        options,
      );*/

    return output;
  }
}
