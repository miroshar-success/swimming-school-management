const models = [
  require('./mui').default,
  require('./tenant').default,
  require('./auditLog').default,
  require('./settings').default,
  require('./file').default,
  require('./user').default,
  require('./class').default,
  require('./classCategory').default,
  require('./grade').default,
  require('./lesson').default,
  require('./paymentCategory').default,
  require('./paymentMethod').default,
  require('./pool').default,
  require('./skill').default,
];

export default function init(database) {
  for (let model of models) {
    model(database);
  }

  return database;
}

export async function createCollections(database) {
  for (let model of models) {
    await model(database).createCollection();
  }

  return database;
}
