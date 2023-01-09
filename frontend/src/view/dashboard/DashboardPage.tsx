import Grid from '@mui/material/Grid';
import LessonsOnCalendar from 'src/view/widgets/LessonsOnCalendar';
import TotalPaymentPerMonth from 'src/view/widgets/TotalPaymentPerMonth';

function DashboardPage(props) {
  return (
    <>
      <Grid container spacing={1.6}>
        <Grid item md={4} xs={12}>
          <TotalPaymentPerMonth />
        </Grid>
        <Grid item xs={12}>
          <LessonsOnCalendar />
        </Grid>
      </Grid>
    </>
  );
}

export default DashboardPage;
