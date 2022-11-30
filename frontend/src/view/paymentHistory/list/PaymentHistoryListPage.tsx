import React from 'react';
import { i18n } from 'src/i18n';
import PaymentHistoryListFilter from 'src/view/paymentHistory/list/PaymentHistoryListFilter';
import PaymentHistoryListTable from 'src/view/paymentHistory/list/PaymentHistoryListTable';
import PaymentHistoryListToolbar from 'src/view/paymentHistory/list/PaymentHistoryListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function PaymentHistoryListPage(props) {
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
              {i18n('payment.list.title')}
            </MDTypography>
            <PaymentHistoryListToolbar />
          </MDBox>
          <PaymentHistoryListFilter />
        </MDBox>
        <PaymentHistoryListTable />
      </Card>
    </>
  );
}

export default PaymentHistoryListPage;
