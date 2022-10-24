import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/policy/importer/policyImporterSelectors';
import PolicyService from 'src/modules/policy/policyService';
import fields from 'src/modules/policy/importer/policyImporterFields';
import { i18n } from 'src/i18n';

const policyImporterActions = importerActions(
  'POLICY_IMPORTER',
  selectors,
  PolicyService.import,
  fields,
  i18n('entities.policy.importer.fileName'),
);

export default policyImporterActions;
