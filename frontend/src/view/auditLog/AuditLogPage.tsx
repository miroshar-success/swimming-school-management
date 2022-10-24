import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import AuditLogFilter from 'src/view/auditLog/AuditLogFilter';
import AuditLogTable from 'src/view/auditLog/AuditLogTable';
import AuditLogToolbar from 'src/view/auditLog/AuditLogToolbar';

function AuditLogPage(props) {
  return (
    <>
      <Card>
        <MDBox pt={2.4} px={2.4}>
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            pb={2.4}
          >
            <MDTypography variant="h3">
              {i18n('auditLog.title')}
            </MDTypography>
            <AuditLogToolbar />
          </MDBox>
        </MDBox>
        <MDBox px={2.4}>
          <AuditLogFilter />
        </MDBox>
        <AuditLogTable />
      </Card>
    </>
  );
}

export default AuditLogPage;
