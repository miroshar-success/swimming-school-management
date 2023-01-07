const prefix = `/tenant/:tenantId/widget`;

export default (app) => {
  // `Lessons on Calendar` Widget APIs
  app.get(
    `${prefix}/lessons-on-calendar/search`,
    require('./lessonsOnCalendar/searchLessons').default,
  );

  app.put(
    `${prefix}/lessons-on-calendar/more`,
    require('./lessonsOnCalendar/moreLessons').default,
  );
};
