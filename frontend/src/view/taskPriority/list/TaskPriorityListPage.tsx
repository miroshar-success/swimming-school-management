import React from 'react';
import { i18n } from 'src/i18n';
import TaskPriorityListFilter from 'src/view/taskPriority/list/TaskPriorityListFilter';
import TaskPriorityListTable from 'src/view/taskPriority/list/TaskPriorityListTable';
import TaskPriorityListToolbar from 'src/view/taskPriority/list/TaskPriorityListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function TaskPriorityListPage(props) {
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
              {i18n('entities.taskPriority.list.title')}
            </MDTypography>
            <TaskPriorityListToolbar />
          </MDBox>
          <TaskPriorityListFilter />
        </MDBox>
        <TaskPriorityListTable />
      </Card>
    </>
  );
}

export default TaskPriorityListPage;
