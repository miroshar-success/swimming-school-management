import React from 'react';
import { i18n } from 'src/i18n';
import PaymentListFilter from 'src/view/payment/list/PaymentListFilter';
import PaymentListTable from 'src/view/payment/list/PaymentListTable';
import PaymentListToolbar from 'src/view/payment/list/PaymentListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function PaymentListPage(props) {
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
              {i18n('payment.title')}
            </MDTypography>
            <PaymentListToolbar />
          </MDBox>
          <PaymentListFilter />
        </MDBox>
        <PaymentListTable />
      </Card>
    </>
  );
}

export default PaymentListPage;
