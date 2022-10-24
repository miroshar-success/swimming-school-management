import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import actions from 'src/modules/risk/view/riskViewActions';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import RiskView from 'src/view/risk/view/RiskView';
import RiskViewToolbar from 'src/view/risk/view/RiskViewToolbar';
import selectors from 'src/modules/risk/view/riskViewSelectors';
import taskListActions from 'src/modules/task/list/taskListActions';

function RiskPage() {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

  const handleOpenTasks = () => {
    window.location.hash = '';
    dispatch(taskListActions.doFetchOpenTasksOnly());
    window.location.hash = 'tasks-on-risk';
  };

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <>
      <Grid spacing={1.6} container>
        <Grid xs={12} item>
          <Card>
            <MDBox p={2.4}>
              <MDBox
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <MDTypography variant="h4">
                  {i18n('entities.risk.view.title')}
                </MDTypography>
                {Boolean(record?.openTasks) && (
                  <MDButton
                    variant="outlined"
                    color="info"
                    startIcon={<AssignmentIcon />}
                    size="small"
                    onClick={handleOpenTasks}
                  >
                    {i18n(
                      'entities.vendor.openTasks',
                      record.openTasks,
                    )}
                  </MDButton>
                )}
                <RiskViewToolbar match={match} />
              </MDBox>
            </MDBox>
          </Card>
        </Grid>
        <Grid xs={12} item>
          <RiskView loading={loading} record={record} />
        </Grid>
      </Grid>
    </>
  );
}

export default RiskPage;
