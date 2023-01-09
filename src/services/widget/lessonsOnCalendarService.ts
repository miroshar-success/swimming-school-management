import { IServiceOptions } from '../IServiceOptions';
import LessonRepository from '../../database/repositories/lessonRepository';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import moment from 'moment';

export default class LessonsOnCalendarService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async moreByLessonInstance({ date, page, rpp }) {
    const day = moment(date).day();

    const filter = {
      $expr: {
        $and: [
          {
            $eq: ['$day', day],
          },
        ],
      },
    };

    let limit = rpp || 1;
    let offset = (rpp || 1) * ((page || 1) - 1);

    if (offset < 0) {
      offset = 0;
    }

    const result = await LessonRepository.findAndCountAll(
      {
        filter,
        limit,
        offset,
        orderBy: 'time_DESC',
      },
      this.options,
    );

    const totalPages = Math.ceil(
      (result.count || 1) / limit,
    );

    return {
      lessons: result.rows ?? [],
      totalPages,
    };
  }

  async search() {
    const result = await LessonRepository.findAndCountAll(
      {
        filter: {},
      },
      this.options,
    );

    return {
      events: [...(result.rows ?? [])],
      currentDate: Date.now(),
    };
  }
}
