import React from 'react';
import { i18n } from 'src/i18n';
import PaymentCategoryListFilter from 'src/view/paymentCategory/list/PaymentCategoryListFilter';
import PaymentCategoryListTable from 'src/view/paymentCategory/list/PaymentCategoryListTable';
import PaymentCategoryListToolbar from 'src/view/paymentCategory/list/PaymentCategoryListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function PaymentCategoryListPage(props) {
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
              {i18n('payment.category.title')}
            </MDTypography>
            <PaymentCategoryListToolbar />
          </MDBox>
          <PaymentCategoryListFilter />
        </MDBox>
        <PaymentCategoryListTable />
      </Card>
    </>
  );
}

export default PaymentCategoryListPage;
