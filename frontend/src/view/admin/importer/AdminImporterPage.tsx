import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import actions from 'src/modules/admin/importer/adminImporterActions';
import fields from 'src/modules/admin/importer/adminImporterFields';
import selectors from 'src/modules/admin/importer/adminImporterSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import importerHoc from 'src/view/shared/importer/Importer';

const Importer = importerHoc(
  selectors,
  actions,
  fields,
  i18n('admin.importer.hint'),
);

function AdminImportPage(props) {
  return (
    <>
      <Card>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          p={2.4}
        >
          <MDTypography variant="h3">
            {i18n('admin.importer.title')}
          </MDTypography>
        </MDBox>
        <Importer />
      </Card>
    </>
  );
}

export default AdminImportPage;
