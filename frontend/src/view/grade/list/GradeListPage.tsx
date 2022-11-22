import React from 'react';
import { i18n } from 'src/i18n';
import GradeListFilter from 'src/view/grade/list/GradeListFilter';
import GradeListTable from 'src/view/grade/list/GradeListTable';
import GradeListToolbar from 'src/view/grade/list/GradeListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function GradeListPage(props) {
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
              {i18n('grade.list.title')}
            </MDTypography>
            <GradeListToolbar />
          </MDBox>
          <GradeListFilter />
        </MDBox>
        <GradeListTable />
      </Card>
    </>
  );
}

export default GradeListPage;
