import React from 'react';
import { i18n } from 'src/i18n';
import TaskListFilter from 'src/view/task/list/TaskListFilter';
import TaskListTable from 'src/view/task/list/TaskListTable';
import TaskListToolbar from 'src/view/task/list/TaskListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function TaskListPage(props) {
  return (
    <>
      <Card>
        <MDBox pt={2.4} px={2.4}>
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            pb={2.4}
          >
            <MDTypography variant="h3">
              {i18n('entities.task.list.title')}
            </MDTypography>

            <TaskListToolbar />
          </MDBox>
          <TaskListFilter />
        </MDBox>
        <TaskListTable />
      </Card>
    </>
  );
}

export default TaskListPage;
