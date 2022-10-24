const prefix = `/tenant/:tenantId/widget`;

export default (app) => {
  // `Tasks By Month` Widget APIs
  app.get(
    `${prefix}/tasks-by-month/total-amounts`,
    require('./tasksByMonth/totalAmounts').default,
  );

  app.get(
    `${prefix}/tasks-by-month/line-chart-datasets`,
    require('./tasksByMonth/lineChartDatasets').default,
  );

  // `Upcoming Tasks` Widget APIs
  app.get(
    `${prefix}/upcoming-tasks`,
    require('./upcomingTasks/index').default,
  );

  // `Tasks on Calendar` Widget APIs
  app.get(
    `${prefix}/tasks-on-calendar/search`,
    require('./tasksOnCalendar/searchTasks').default,
  );

  app.put(
    `${prefix}/tasks-on-calendar/move`,
    require('./tasksOnCalendar/moveTask').default,
  );

  app.put(
    `${prefix}/tasks-on-calendar/more`,
    require('./tasksOnCalendar/moreTasks').default,
  );
};
