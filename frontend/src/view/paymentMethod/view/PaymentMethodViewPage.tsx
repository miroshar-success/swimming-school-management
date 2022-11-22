import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/paymentMethod/view/paymentMethodViewActions';
import selectors from 'src/modules/paymentMethod/view/paymentMethodViewSelectors';
import PaymentMethodView from 'src/view/paymentMethod/view/PaymentMethodView';
import PaymentMethodViewToolbar from 'src/view/paymentMethod/view/PaymentMethodViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function PaymentMethodPage() {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <>
      <Card>
        <MDBox py={2.4} px={2.4}>
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <MDTypography variant="h3" mb={2.4}>
              {i18n('paymentMethod.view.title')}
            </MDTypography>
            <PaymentMethodViewToolbar match={match} />
          </MDBox>
          <PaymentMethodView
            loading={loading}
            record={record}
          />
        </MDBox>
      </Card>
    </>
  );
}

export default PaymentMethodPage;
