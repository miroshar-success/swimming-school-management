import React from 'react';
import { i18n } from 'src/i18n';
import PoolListFilter from 'src/view/pool/list/PoolListFilter';
import PoolListTable from 'src/view/pool/list/PoolListTable';
import PoolListToolbar from 'src/view/pool/list/PoolListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function PoolListPage(props) {
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
              {i18n('pool.list.title')}
            </MDTypography>
            <PoolListToolbar />
          </MDBox>
          <PoolListFilter />
        </MDBox>
        <PoolListTable />
      </Card>
    </>
  );
}

export default PoolListPage;
