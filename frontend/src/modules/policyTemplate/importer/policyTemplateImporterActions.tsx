import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/policyTemplate/importer/policyTemplateImporterSelectors';
import PolicyTemplateService from 'src/modules/policyTemplate/policyTemplateService';
import fields from 'src/modules/policyTemplate/importer/policyTemplateImporterFields';
import { i18n } from 'src/i18n';

const policyTemplateImporterActions = importerActions(
  'POLICYTEMPLATE_IMPORTER',
  selectors,
  PolicyTemplateService.import,
  fields,
  i18n('entities.policyTemplate.importer.fileName'),
);

export default policyTemplateImporterActions;
