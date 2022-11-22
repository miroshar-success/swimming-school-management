export default (app) => {
  app.post(
    `/tenant/:tenantId/file/upload`,
    require('./localhost/upload').default,
  );
  app.get(
    `/file/download`,
    require('./localhost/download').default,
  );
  app.get(
    `/tenant/:tenantId/file/credentials`,
    require('./credentials').default,
  );
};
