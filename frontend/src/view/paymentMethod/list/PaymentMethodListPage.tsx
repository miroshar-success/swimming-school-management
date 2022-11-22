import React from 'react';
import { i18n } from 'src/i18n';
import PaymentMethodListFilter from 'src/view/paymentMethod/list/PaymentMethodListFilter';
import PaymentMethodListTable from 'src/view/paymentMethod/list/PaymentMethodListTable';
import PaymentMethodListToolbar from 'src/view/paymentMethod/list/PaymentMethodListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function PaymentMethodListPage(props) {
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
              {i18n('paymentMethod.list.title')}
            </MDTypography>
            <PaymentMethodListToolbar />
          </MDBox>
          <PaymentMethodListFilter />
        </MDBox>
        <PaymentMethodListTable />
      </Card>
    </>
  );
}

export default PaymentMethodListPage;
