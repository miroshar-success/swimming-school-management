import Grid from '@mui/material/Grid';
import LessonsOnCalendar from 'src/view/widgets/LessonsOnCalendar';
import TotalPaymentPerMonth from 'src/view/widgets/TotalPaymentPerMonth';
import TotalPaidStudentsPerMonth from 'src/view/widgets/TotalPaidStudentsPerMonth';
import TotalNewStudentsPerMonth from 'src/view/widgets/TotalNewStudentsPerMonth';
import TotalStudentsByAge from 'src/view/widgets/TotalStudentsByAge';
import TotalStudents from 'src/view/widgets/TotalStudents';
import TotalTeachers from 'src/view/widgets/TotalTeachers';

function DashboardPage(props) {
  return (
    <>
      <Grid container spacing={2.4}>
        <Grid item md={3} xs={12}>
          <TotalTeachers />
        </Grid>
        <Grid item md={3} xs={12}>
          <TotalStudents />
        </Grid>
        <Grid item xs={12}>
          <TotalPaymentPerMonth />
        </Grid>
        <Grid item md={4} xs={12}>
          <TotalPaidStudentsPerMonth />
        </Grid>
        <Grid item md={4} xs={12}>
          <TotalNewStudentsPerMonth />
        </Grid>
        <Grid item md={4} xs={12}>
          <TotalStudentsByAge />
        </Grid>
        <Grid item xs={12}>
          <LessonsOnCalendar />
        </Grid>
      </Grid>
    </>
  );
}

export default DashboardPage;
