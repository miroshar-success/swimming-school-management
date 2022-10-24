import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import actions from 'src/modules/policy/importer/policyImporterActions';
import fields from 'src/modules/policy/importer/policyImporterFields';
import importerHoc from 'src/view/shared/importer/Importer';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import selectors from 'src/modules/policy/importer/policyImporterSelectors';

function PolicyImportPage() {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('entities.policy.importer.hint'),
  );

  return (
    <Card>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        p={2.4}
      >
        <MDTypography variant="h3">
          {i18n('entities.policy.importer.title')}
        </MDTypography>
      </MDBox>
      <Importer />
    </Card>
  );
}

export default PolicyImportPage;
