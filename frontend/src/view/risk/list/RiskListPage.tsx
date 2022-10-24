import React from 'react';
import { i18n } from 'src/i18n';
import RiskListFilter from 'src/view/risk/list/RiskListFilter';
import RiskListTable from 'src/view/risk/list/RiskListTable';
import RiskListToolbar from 'src/view/risk/list/RiskListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function RiskListPage(props) {
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
              {i18n('entities.risk.list.title')}
            </MDTypography>
            <RiskListToolbar />
          </MDBox>
          <RiskListFilter />
        </MDBox>
        <RiskListTable />
      </Card>
    </>
  );
}

export default RiskListPage;
