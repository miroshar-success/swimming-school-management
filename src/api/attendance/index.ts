export default (app) => {
  app.put(
    `/tenant/:tenantId/attendance/:id`,
    require('./attendanceCreate').default,
  );
  app.get(
    `/tenant/:tenantId/attendance`,
    require('./attendanceList').default,
  );
  app.delete(
    `/tenant/:tenantId/attendance`,
    require('./attendanceDestroy').default,
  );
};
