import { i18n } from 'src/i18n';
import Card from '@mui/material/Card';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import StudentFilter from 'src/view/student/list/StudentFilter';
import StudentTable from 'src/view/student/list/StudentTable';
import StudentToolbar from 'src/view/student/list/StudentToolbar';

function StudentPage() {
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
              {i18n('student.title')}
            </MDTypography>
            <StudentToolbar />
          </MDBox>
          <StudentFilter />
        </MDBox>
        <StudentTable />
      </Card>
    </>
  );
}

export default StudentPage;
