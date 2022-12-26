import Grid from '@mui/material/Grid';
import LessonsOnCalendar from 'src/view/widgets/LessonsOnCalendar';

function DashboardPage(props) {
  return (
    <>
      <Grid container spacing={1.6}>
        <Grid item xs={12}>
          <LessonsOnCalendar />
        </Grid>
      </Grid>
    </>
  );
}

export default DashboardPage;
