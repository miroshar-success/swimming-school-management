export default (app) => {
  app.put(
    `/tenant/:tenantId/document/:id`,
    require('./documentUpdate').default,
  );
  app.delete(
    `/tenant/:tenantId/document`,
    require('./documentDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/document`,
    require('./documentList').default,
  );
  app.post(
    `/tenant/:tenantId/document`,
    require('./documentSave').default,
  );
};
