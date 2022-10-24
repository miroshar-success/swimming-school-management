import { IServiceOptions } from '../IServiceOptions';
import TaskRepositoryEx from '../../database/repositories/extend/taskRepositoryEx';
import TaskInstanceRepositoryEx from '../../database/repositories/extend/taskInstanceRepositoryEx';

export default class TasksByMonthService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async totalAmounts() {
    const records: any[] =
      await TaskInstanceRepositoryEx.aggregate(
        {
          group: {
            _id: {
              $cond: {
                if: {
                  $and: [
                    {
                      $lte: [
                        {
                          $dateToString: {
                            date: '$completedDate',
                            format: '%Y-%m-%d',
                          },
                        },
                        {
                          $dateToString: {
                            date: '$dueDate',
                            format: '%Y-%m-%d',
                          },
                        },
                      ],
                    },
                    { $eq: ['$status', 'Complete'] },
                  ],
                },
                then: 'completed',
                else: {
                  $cond: {
                    if: {
                      $and: [
                        { $eq: ['$status', 'Complete'] },
                        {
                          $gt: [
                            {
                              $dateToString: {
                                date: '$completedDate',
                                format: '%Y-%m-%d',
                              },
                            },
                            {
                              $dateToString: {
                                date: '$dueDate',
                                format: '%Y-%m-%d',
                              },
                            },
                          ],
                        },
                        {
                          $lte: [
                            {
                              $dateDiff: {
                                startDate: '$dueDate',
                                endDate: '$completedDate',
                                unit: 'day',
                              },
                            },
                            3,
                          ],
                        },
                      ],
                    },
                    then: 'overdue',
                    else: {
                      $cond: {
                        if: {
                          $or: [
                            {
                              $eq: ['$completedDate', null],
                            },
                            {
                              $gt: [
                                {
                                  $dateDiff: {
                                    startDate: '$dueDate',
                                    endDate:
                                      '$completedDate',
                                    unit: 'day',
                                  },
                                },
                                3,
                              ],
                            },
                          ],
                        },
                        then: 'notCompleted',
                        else: '',
                      },
                    },
                  },
                },
              },
            },
            totalAmount: { $sum: 1 },
          },
        },
        this.options,
      );

    const result = {
      all: await TaskRepositoryEx.count({}, this.options),
      created: await TaskInstanceRepositoryEx.count(
        {},
        this.options,
      ),
    };

    for (let i = 0; i < records.length; i++) {
      result[records[i]._id] = records[i].totalAmount;
    }

    return result;
  }

  async lineChartDatasets() {
    const limits = {
      sorts: {
        '_id.year': -1,
        '_id.month': -1,
      },
      limit: 12,
    };

    const creates: any[] =
      await TaskInstanceRepositoryEx.aggregate(
        {
          group: {
            _id: {
              year: {
                $dateToString: {
                  date: '$createdAt',
                  format: '%Y',
                },
              },
              month: {
                $dateToString: {
                  date: '$createdAt',
                  format: '%m',
                },
              },
            },
            created: {
              $sum: 1,
            },
          },
          ...limits,
        },
        this.options,
      );

    const records: any[] =
      await TaskInstanceRepositoryEx.aggregate(
        {
          group: {
            _id: {
              year: {
                $dateToString: {
                  date: '$dueDate',
                  format: '%Y',
                },
              },
              month: {
                $dateToString: {
                  date: '$dueDate',
                  format: '%m',
                },
              },
            },
            completed: {
              $sum: {
                $cond: {
                  if: {
                    $and: [
                      {
                        $lte: [
                          {
                            $dateToString: {
                              date: '$completedDate',
                              format: '%Y-%m-%d',
                            },
                          },
                          {
                            $dateToString: {
                              date: '$dueDate',
                              format: '%Y-%m-%d',
                            },
                          },
                        ],
                      },
                      { $eq: ['$status', 'Complete'] },
                    ],
                  },
                  then: 1,
                  else: 0,
                },
              },
            },
            overdue: {
              $sum: {
                $cond: {
                  if: {
                    $and: [
                      { $eq: ['$status', 'Complete'] },
                      {
                        $gt: [
                          {
                            $dateToString: {
                              date: '$completedDate',
                              format: '%Y-%m-%d',
                            },
                          },
                          {
                            $dateToString: {
                              date: '$dueDate',
                              format: '%Y-%m-%d',
                            },
                          },
                        ],
                      },
                      {
                        $lte: [
                          {
                            $dateDiff: {
                              startDate: '$dueDate',
                              endDate: '$completedDate',
                              unit: 'day',
                            },
                          },
                          3,
                        ],
                      },
                    ],
                  },
                  then: 1,
                  else: 0,
                },
              },
            },
            notCompleted: {
              $sum: {
                $cond: {
                  if: {
                    $or: [
                      { $eq: ['$completedDate', null] },
                      {
                        $gt: [
                          {
                            $dateDiff: {
                              startDate: '$dueDate',
                              endDate: '$completedDate',
                              unit: 'day',
                            },
                          },
                          3,
                        ],
                      },
                    ],
                  },
                  then: 1,
                  else: 0,
                },
              },
            },
          },
          ...limits,
        },
        this.options,
      );

    creates.forEach((created) => {
      const index = records.findIndex(
        (record) =>
          record._id.year === created._id.year &&
          record._id.month === created._id.month,
      );
      if (index === -1) {
        records.push(created);
      } else {
        records[index].created = created.created ?? 0;
      }
    });

    records.splice(limits.limit);
    records.reverse();

    const labels: string[] = [];
    const datasets: {
      label: string;
      data: number[];
    }[] = [
      {
        label: 'created',
        data: [],
      },
      {
        label: 'completed',
        data: [],
      },
      {
        label: 'overdue',
        data: [],
      },
      {
        label: 'notCompleted',
        data: [],
      },
    ];

    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    for (let i = 0; i < records.length; i++) {
      const monthName: string[] = [];
      if (
        i === 0 ||
        records[i]._id.year !== records[i - 1]._id.year
      ) {
        monthName.push(records[i]._id.year?.toString());
      }
      monthName.push(
        monthNames[Number(records[i]._id.month) - 1],
      );
      labels.push(monthName.join(' '));
      for (let j = 0; j < datasets.length; j++) {
        datasets[j].data.push(
          records[i][datasets[j].label] ?? 0,
        );
      }
    }

    return {
      labels,
      datasets,
    };
  }
}
