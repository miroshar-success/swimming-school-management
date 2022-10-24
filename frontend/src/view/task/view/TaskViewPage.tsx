import { Card, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/task/view/taskViewActions';
import selectors from 'src/modules/task/view/taskViewSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import TaskView from 'src/view/task/view/TaskView';
import TaskViewToolbar from 'src/view/task/view/TaskViewToolbar';
import TaskInstanceListTable from 'src/view/taskInstance/list/TaskInstanceListTable';

function TaskPage() {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

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
                alignItems="center"
              >
                <MDTypography variant="h4">
                  {i18n('entities.task.view.title')}
                </MDTypography>
                <TaskViewToolbar match={match} />
              </MDBox>
            </MDBox>
          </Card>
        </Grid>
        <Grid xs={12} item>
          <TaskView loading={loading} record={record} />
        </Grid>
        {Boolean(record) && record.repeat !== 'Never' && (
          <Grid xs={12} item>
            <Card>
              <MDBox p={2.4} pb={0}>
                <MDTypography variant="h4">
                  {i18n('entities.task.instances')}
                </MDTypography>
                <TaskInstanceListTable
                  task={match.params.id}
                />
              </MDBox>
            </Card>
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default TaskPage;
