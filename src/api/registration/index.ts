export default (app) => {
  app.put(
    `/tenant/:tenantId/registrationLessons`,
    require('./registrationLessons').default,
  );
};
