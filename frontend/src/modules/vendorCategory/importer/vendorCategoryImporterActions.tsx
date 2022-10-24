import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/vendorCategory/importer/vendorCategoryImporterSelectors';
import VendorCategoryService from 'src/modules/vendorCategory/vendorCategoryService';
import fields from 'src/modules/vendorCategory/importer/vendorCategoryImporterFields';
import { i18n } from 'src/i18n';

const vendorCategoryImporterActions = importerActions(
  'VENDORCATEGORY_IMPORTER',
  selectors,
  VendorCategoryService.import,
  fields,
  i18n('entities.vendorCategory.importer.fileName'),
);

export default vendorCategoryImporterActions;
