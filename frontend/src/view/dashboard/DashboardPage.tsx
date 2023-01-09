import Grid from '@mui/material/Grid';
import LessonsOnCalendar from 'src/view/widgets/LessonsOnCalendar';
import TotalPaymentPerMonth from 'src/view/widgets/TotalPaymentPerMonth';
import TotalPaidStudentsPerMonth from 'src/view/widgets/TotalPaidStudentsPerMonth';
import TotalNewStudentsPerMonth from 'src/view/widgets/TotalNewStudentsPerMonth';
import TotalStudentsByAge from 'src/view/widgets/TotalStudentsByAge';

function DashboardPage(props) {
  return (
    <>
      <Grid container spacing={1.6}>
        <Grid item md={4} xs={12}>
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
