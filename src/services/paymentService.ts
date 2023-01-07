import Error400 from '../errors/Error400';
import MongooseRepository from '../database/repositories/mongooseRepository';
import { IServiceOptions } from './IServiceOptions';
import PaymentRepository from '../database/repositories/paymentRepository';
import UserRepository from '../database/repositories/userRepository';
import TenantUserRepository from '../database/repositories/tenantUserRepository';
import { AnyARecord } from 'dns';

export default class PaymentService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      const record = await PaymentRepository.create(
        id,
        data,
        {
          ...this.options,
          session,
        },
      );

      await TenantUserRepository.updateStatus(
        this.options.currentTenant.id,
        id,
        'active',
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
        'payment',
      );

      throw error;
    }
  }

  async destroyAll(paymentIds) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      for (const id of paymentIds) {
        await PaymentRepository.destroy(id, {
          ...this.options,
          session,
        });
      }

      await MongooseRepository.commitTransaction(session);
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  async expiredFindAll(args) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      const students = await UserRepository.findAndCountAll(
        {
          ...args,
          filter: { ...args.filter, status: 'active' },
        },
        'student',
        {
          ...this.options,
          session,
        },
      );

      await MongooseRepository.commitTransaction(session);

      let rows: any = [];
      let count = 0;

      for (let i = 0; i < students.rows.length; i++) {
        const expiredDate = Math.max(
          ...students.rows[i].payments.map((payment) => {
            return new Date(
              payment.year,
              payment.month + 1,
              5,
            ).getTime();
          }),
        );

        if (expiredDate < new Date().getTime()) {
          const expired = Math.floor(
            (new Date().getTime() - expiredDate) /
              (1000 * 3600 * 24),
          );
          let cost = 0;
          for (
            let j = 0;
            j < students.rows[i].payments.length;
            j++
          ) {
            cost += students.rows[i].payments[j].cost;
          }
          let month = new Date(expiredDate).getMonth() - 1;
          let year = new Date(expiredDate).getFullYear();
          if (month < 0) {
            month = month + 12;
            year = year - 1;
          }

          rows.push({
            id: students.rows[i].id,
            studentNumber: students.rows[i].studentNumber,
            fullName: students.rows[i].fullName,
            month: month,
            year: year,
            expiredDate: expired,
            cost: cost,
          });

          count++;
        }
      }

      return { rows, count };
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  async findById(id) {
    return PaymentRepository.findById(id, this.options);
  }
}
