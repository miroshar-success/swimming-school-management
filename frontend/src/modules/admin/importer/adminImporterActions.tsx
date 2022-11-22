import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/admin/importer/adminImporterSelectors';
import AdminService from 'src/modules/admin/adminService';
import fields from 'src/modules/admin/importer/adminImporterFields';
import { i18n } from 'src/i18n';

const adminImporterActions = importerActions(
  'ADMIN_IMPORTER',
  selectors,
  AdminService.import,
  fields,
  i18n('admin.importer.fileName'),
);

export default adminImporterActions;
