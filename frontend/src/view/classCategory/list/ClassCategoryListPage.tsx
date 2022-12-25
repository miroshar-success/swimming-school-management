import React from 'react';
import { i18n } from 'src/i18n';
import ClassCategoryListFilter from 'src/view/classCategory/list/ClassCategoryListFilter';
import ClassCategoryListTable from 'src/view/classCategory/list/ClassCategoryListTable';
import ClassCategoryListToolbar from 'src/view/classCategory/list/ClassCategoryListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function ClassCategoryListPage(props) {
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
              {i18n('classCategory.title')}
            </MDTypography>
            <ClassCategoryListToolbar />
          </MDBox>
          <ClassCategoryListFilter />
        </MDBox>
        <ClassCategoryListTable />
      </Card>
    </>
  );
}

export default ClassCategoryListPage;
