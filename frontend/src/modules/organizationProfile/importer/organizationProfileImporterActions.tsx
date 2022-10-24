import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/organizationProfile/importer/organizationProfileImporterSelectors';
import OrganizationProfileService from 'src/modules/organizationProfile/organizationProfileService';
import fields from 'src/modules/organizationProfile/importer/organizationProfileImporterFields';
import { i18n } from 'src/i18n';

const organizationProfileImporterActions = importerActions(
  'ORGANIZATIONPROFILE_IMPORTER',
  selectors,
  OrganizationProfileService.import,
  fields,
  i18n('entities.organizationProfile.importer.fileName'),
);

export default organizationProfileImporterActions;
