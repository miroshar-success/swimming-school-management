import React from 'react';
import { i18n } from 'src/i18n';
import TaskListListFilter from 'src/view/taskList/list/TaskListListFilter';
import TaskListListTable from 'src/view/taskList/list/TaskListListTable';
import TaskListListToolbar from 'src/view/taskList/list/TaskListListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function TaskListListPage(props) {
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
              {i18n('entities.taskList.list.title')}
            </MDTypography>
            <TaskListListToolbar />
          </MDBox>
          <TaskListListFilter />
        </MDBox>
        <TaskListListTable />
      </Card>
    </>
  );
}

export default TaskListListPage;
