import React from 'react';
import { i18n } from 'src/i18n';
import ClassListFilter from 'src/view/class/list/ClassListFilter';
import ClassListTable from 'src/view/class/list/ClassListTable';
import ClassListToolbar from 'src/view/class/list/ClassListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function ClassListPage(props) {
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
              {i18n('class.title')}
            </MDTypography>
            <ClassListToolbar />
          </MDBox>
          <ClassListFilter />
        </MDBox>
        <ClassListTable />
      </Card>
    </>
  );
}

export default ClassListPage;
