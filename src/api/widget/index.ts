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

  app.get(
    `${prefix}/payments-for-statistics/totalPayments`,
    require('./paymentsForStatistics/totalPaymentPerMonth')
      .default,
  );

  app.get(
    `${prefix}/payments-for-statistics/totalPaidStudents`,
    require('./paymentsForStatistics/totalPaidStudentsPerMonth')
      .default,
  );

  app.get(
    `${prefix}/payments-for-statistics/incomeToday`,
    require('./paymentsForStatistics/incomeToday').default,
  );

  app.get(
    `${prefix}/students-for-statistics/totalNewStudents`,
    require('./studentsForStatistics/totalNewStudentsPerMonth')
      .default,
  );

  app.get(
    `${prefix}/students-for-statistics/countMaleAndFemale`,
    require('./studentsForStatistics/countMaleAndFemale')
      .default,
  );

  app.get(
    `${prefix}/students-for-statistics/totalStudentsByAge`,
    require('./studentsForStatistics/totalStudentsByAge')
      .default,
  );

  app.get(
    `${prefix}/students-for-statistics/maxAttendanceDay`,
    require('./studentsForStatistics/maxAttendanceDay')
      .default,
  );
};
