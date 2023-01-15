export default (app) => {
  app.put(
    `/tenant/:tenantId/settings`,
    require('./settingsSave').default,
  );
  app.get(
    `/tenant/:tenantId/settings`,
    require('./settingsFind').default,
  );
  app.get(
    `/tenant/schools`,
    require('./schoolsList').default,
  );
  app.get(
    `/tenant/schools/:id`,
    require('./schoolsFind').default,
  );
};
