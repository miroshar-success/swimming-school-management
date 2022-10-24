const models = [
  require('./mui').default,
  require('./tenant').default,
  require('./auditLog').default,
  require('./settings').default,
  require('./file').default,
  require('./user').default,
  require('./vendor').default,
  require('./vendorCategory').default,
  require('./task').default,
  require('./taskInstance').default,
  require('./taskPriority').default,
  require('./taskList').default,
  require('./note').default,
  require('./risk').default,
  require('./riskCategory').default,
  require('./product').default,
  require('./productCategory').default,
  require('./productFavorite').default,
  require('./organizationProfile').default,
  require('./newsArticle').default,
  require('./newsFavorite').default,
  require('./tag').default,
  require('./tagRef').default,
  require('./policyTemplate').default,
  require('./policyTemplateFavorite').default,
  require('./policy').default,
  require('./policyFavorite').default,
  require('./policyInstance').default,
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
