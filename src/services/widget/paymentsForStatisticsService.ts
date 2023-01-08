import { IServiceOptions } from '../IServiceOptions';
import PaymentRepository from '../../database/repositories/lessonRepository';
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
}
