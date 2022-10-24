import { useSelector } from 'react-redux';
import authSelectors from 'src/modules/auth/authSelectors';
import Grid from '@mui/material/Grid';
import PermissionChecker from 'src/modules/auth/permissionChecker';
import RisksSummary from 'src/view/widgets/RisksSummary';
import TasksOnCalendar from 'src/view/widgets/TasksOnCalendar';
import TasksSummary from 'src/view/widgets/TasksSummary';
import TypeForm from 'src/view/widgets/TypeForm';
import UpcomingTasks from 'src/view/widgets/UpcomingTasks';
import VendorsSummary from 'src/view/widgets/VendorsSummary';

function DashboardPage(props) {
  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );
  const currentUser = useSelector(
    authSelectors.selectCurrentUser,
  );

  const permissionChecker = new PermissionChecker(
    currentTenant,
    currentUser,
  );
  return (
    <>
      <Grid container spacing={1.6}>
        {!permissionChecker.needsAnswers && (
          <Grid item xs={12}>
            <TypeForm />
          </Grid>
        )}
        <Grid item xs={12}>
          <Grid container spacing={1.6}>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <TasksSummary />
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <Grid container spacing={1.6}>
                <Grid item xs={12}>
                  <RisksSummary />
                </Grid>
                <Grid item xs={12}>
                  <VendorsSummary />
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <UpcomingTasks />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TasksOnCalendar />
        </Grid>
      </Grid>
    </>
  );
}

export default DashboardPage;
