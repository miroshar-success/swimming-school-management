import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/riskCategory/importer/riskCategoryImporterSelectors';
import RiskCategoryService from 'src/modules/riskCategory/riskCategoryService';
import fields from 'src/modules/riskCategory/importer/riskCategoryImporterFields';
import { i18n } from 'src/i18n';

const riskCategoryImporterActions = importerActions(
  'RISKCATEGORY_IMPORTER',
  selectors,
  RiskCategoryService.import,
  fields,
  i18n('entities.riskCategory.importer.fileName'),
);

export default riskCategoryImporterActions;
