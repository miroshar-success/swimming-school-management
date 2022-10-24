const prefix = '/tenant/:tenantId/task-instance';

export default (app) => {
  app.post(
    `${prefix}`,
    require('./taskInstanceCreate').default,
  );
  app.put(
    `${prefix}/:id`,
    require('./taskInstanceUpdate').default,
  );
  app.put(
    `${prefix}/:id/tags`,
    require('./taskInstanceTags').default,
  );
  app.post(
    `${prefix}/import`,
    require('./taskInstanceImport').default,
  );
  app.delete(
    `${prefix}`,
    require('./taskInstanceDestroy').default,
  );
  app.get(
    `${prefix}/autocomplete`,
    require('./taskInstanceAutocomplete').default,
  );
  app.get(
    `${prefix}`,
    require('./taskInstanceList').default,
  );
  app.get(
    `${prefix}/:id`,
    require('./taskInstanceFind').default,
  );
};
