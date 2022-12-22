import { i18n } from 'src/i18n';
import Card from '@mui/material/Card';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import TeacherFilter from 'src/view/teacher/list/TeacherFilter';
import TeacherTable from 'src/view/teacher/list/TeacherTable';
import TeacherToolbar from 'src/view/teacher/list/TeacherToolbar';

function TeacherPage() {
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
              {i18n('teacher.title')}
            </MDTypography>
            <TeacherToolbar />
          </MDBox>
          <TeacherFilter />
        </MDBox>
        <TeacherTable />
      </Card>
    </>
  );
}

export default TeacherPage;
