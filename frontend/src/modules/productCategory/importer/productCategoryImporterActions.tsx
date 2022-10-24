import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/productCategory/importer/productCategoryImporterSelectors';
import ProductCategoryService from 'src/modules/productCategory/productCategoryService';
import fields from 'src/modules/productCategory/importer/productCategoryImporterFields';
import { i18n } from 'src/i18n';

const productCategoryImporterActions = importerActions(
  'PRODUCTCATEGORY_IMPORTER',
  selectors,
  ProductCategoryService.import,
  fields,
  i18n('entities.productCategory.importer.fileName'),
);

export default productCategoryImporterActions;
