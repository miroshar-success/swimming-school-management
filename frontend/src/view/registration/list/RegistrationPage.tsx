import { i18n } from 'src/i18n';
import Card from '@mui/material/Card';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import RegistrationFilter from 'src/view/registration/list/RegistrationFilter';
import RegistrationTable from 'src/view/registration/list/RegistrationTable';
import RegistrationToolbar from 'src/view/registration/list/RegistrationToolbar';

function RegistrationPage() {
  return (
    <>
      <Card sx={{ px: '20px' }}>
        <MDBox pt={2.4}>
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            pb={2.4}
          >
            <MDTypography variant="h3">
              {i18n('registration.title')}
            </MDTypography>
            <RegistrationToolbar />
          </MDBox>
          <RegistrationFilter />
        </MDBox>
        <RegistrationTable />
      </Card>
    </>
  );
}

export default RegistrationPage;
