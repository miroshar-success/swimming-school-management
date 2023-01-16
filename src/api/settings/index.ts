export default (app) => {
  app.put(
    `/tenant/:tenantId/settings`,
    require('./settingsSave').default,
  );
  app.get(
    `/tenant/:tenantId/settings`,
    require('./settingsFind').default,
  );
  app.get(`/schools`, require('./schoolsList').default);
  app.get(`/schools/:id`, require('./schoolsFind').default);
};
