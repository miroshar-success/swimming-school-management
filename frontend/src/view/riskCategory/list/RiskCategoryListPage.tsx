import React from 'react';
import { i18n } from 'src/i18n';
import RiskCategoryListFilter from 'src/view/riskCategory/list/RiskCategoryListFilter';
import RiskCategoryListTable from 'src/view/riskCategory/list/RiskCategoryListTable';
import RiskCategoryListToolbar from 'src/view/riskCategory/list/RiskCategoryListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function RiskCategoryListPage(props) {
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
              {i18n('entities.riskCategory.list.title')}
            </MDTypography>

            <RiskCategoryListToolbar />
          </MDBox>
          <RiskCategoryListFilter />
        </MDBox>
        <RiskCategoryListTable />
      </Card>
    </>
  );
}

export default RiskCategoryListPage;
