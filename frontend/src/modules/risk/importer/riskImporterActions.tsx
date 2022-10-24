import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/risk/importer/riskImporterSelectors';
import RiskService from 'src/modules/risk/riskService';
import fields from 'src/modules/risk/importer/riskImporterFields';
import { i18n } from 'src/i18n';

const riskImporterActions = importerActions(
  'RISK_IMPORTER',
  selectors,
  RiskService.import,
  fields,
  i18n('entities.risk.importer.fileName'),
);

export default riskImporterActions;
