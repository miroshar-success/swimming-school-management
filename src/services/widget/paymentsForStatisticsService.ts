import { IServiceOptions } from '../IServiceOptions';
import PaymentRepository from '../../database/repositories/paymentRepository';
import moment from 'moment';

export default class PaymentsForStatisticsService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async totalPaymentPerMonth() {
    const result = await PaymentRepository.findAndCountAll(
      {
        filter: { year: moment().year() },
      },
      this.options,
    );

    const payments = result.rows;

    let total = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < payments.length; i++) {
      total[payments[i].month] += payments[i].cost;
    }

    return total;
  }

  async totalPaidStudentsPerMonth() {
    const result = await PaymentRepository.findAndCountAll(
      {
        filter: { year: moment().year() },
      },
      this.options,
    );

    const payments = result.rows;

    let total = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    let students: Array<any> = [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ];

    for (let i = 0; i < payments.length; i++) {
      if (
        students[payments[i].month].find(
          (student) => student === payments[i].student,
        ) === undefined
      ) {
        students[payments[i].month].push(
          payments[i].student,
        );
        total[payments[i].month]++;
      }
    }

    return total;
  }

  async incomeToday() {
    const result = await PaymentRepository.findAndCountAll(
      {
        filter: {
          createdAtRange: [
            moment().set({ hour: 0, minute: 0, second: 0 }),
            moment(),
          ],
        },
      },
      this.options,
    );

    const payments = result.rows;

    let total = 0;

    for (let i = 0; i < payments.length; i++) {
      total += payments[i].cost;
    }

    return total;
  }
}
