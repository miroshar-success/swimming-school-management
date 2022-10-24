import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/taskList/view/taskListViewActions';
import selectors from 'src/modules/taskList/view/taskListViewSelectors';
import TaskListView from 'src/view/taskList/view/TaskListView';
import TaskListViewToolbar from 'src/view/taskList/view/TaskListViewToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function TaskListPage() {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <>
      <Card>
        <MDBox py={2.4} px={2.4}>
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <MDTypography variant="h3" mb={2.4}>
              {i18n('entities.taskList.view.title')}
            </MDTypography>
            <TaskListViewToolbar match={match} />
          </MDBox>
          <TaskListView loading={loading} record={record} />
        </MDBox>
      </Card>
    </>
  );
}

export default TaskListPage;
