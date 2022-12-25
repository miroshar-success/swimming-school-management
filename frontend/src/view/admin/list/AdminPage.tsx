import { i18n } from 'src/i18n';
import Card from '@mui/material/Card';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import AdminFilter from 'src/view/admin/list/AdminFilter';
import AdminTable from 'src/view/admin/list/AdminTable';
import AdminToolbar from 'src/view/admin/list/AdminToolbar';

function AdminPage() {
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
              {i18n('user.title')}
            </MDTypography>
            <AdminToolbar />
          </MDBox>
          <AdminFilter />
        </MDBox>
        <AdminTable />
      </Card>
    </>
  );
}

export default AdminPage;
