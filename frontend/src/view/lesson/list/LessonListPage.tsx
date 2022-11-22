import React from 'react';
import { i18n } from 'src/i18n';
import LessonListFilter from 'src/view/lesson/list/LessonListFilter';
import LessonListTable from 'src/view/lesson/list/LessonListTable';
import LessonListToolbar from 'src/view/lesson/list/LessonListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function LessonListPage(props) {
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
              {i18n('lesson.list.title')}
            </MDTypography>
            <LessonListToolbar />
          </MDBox>
          <LessonListFilter />
        </MDBox>
        <LessonListTable />
      </Card>
    </>
  );
}

export default LessonListPage;
