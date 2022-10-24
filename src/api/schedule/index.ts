export default (app) => {
  app.get(
    `/schedule/recurring-tasks`,
    require('./recurringTasks').default,
  );
};
