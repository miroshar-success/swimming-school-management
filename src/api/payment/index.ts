export default (app) => {
  app.put(
    `/tenant/:tenantId/payment/:id`,
    require('./paymentCreate').default,
  );
  app.delete(
    `/tenant/:tenantId/payment`,
    require('./paymentDestroy').default,
  );
};
