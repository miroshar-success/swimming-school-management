import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/vendor/importer/vendorImporterSelectors';
import VendorService from 'src/modules/vendor/vendorService';
import fields from 'src/modules/vendor/importer/vendorImporterFields';
import { i18n } from 'src/i18n';

const vendorImporterActions = importerActions(
  'VENDOR_IMPORTER',
  selectors,
  VendorService.import,
  fields,
  i18n('entities.vendor.importer.fileName'),
);

export default vendorImporterActions;
