import React from 'react';
import { i18n } from 'src/i18n';
import PaymentExpiredListFilter from 'src/view/paymentExpired/list/PaymentExpiredListFilter';
import PaymentExpiredListTable from 'src/view/paymentExpired/list/PaymentExpiredListTable';
import PaymentExpiredListToolbar from 'src/view/paymentExpired/list/PaymentExpiredListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function PaymentExpiredListPage(props) {
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
              {i18n('paymentExpired.list.title')}
            </MDTypography>
            <PaymentExpiredListToolbar />
          </MDBox>
          <PaymentExpiredListFilter />
        </MDBox>
        <PaymentExpiredListTable />
      </Card>
    </>
  );
}

export default PaymentExpiredListPage;
