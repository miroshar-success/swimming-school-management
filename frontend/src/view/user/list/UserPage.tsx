import { i18n } from 'src/i18n';
import Card from '@mui/material/Card';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import UserFilter from 'src/view/user/list/UserFilter';
import UserTable from 'src/view/user/list/UserTable';
import UserToolbar from 'src/view/user/list/UserToolbar';

function UserPage() {
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
            <UserToolbar />
          </MDBox>
          <UserFilter />
        </MDBox>
        <UserTable />
      </Card>
    </>
  );
}

export default UserPage;
