import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/payment/form/paymentFormActions';
import studentActions from 'src/modules/student/form/studentFormActions';
import selectors from 'src/modules/student/form/studentFormSelectors';
import { getHistory } from 'src/modules/store';
import PaymentForm from 'src/view/payment/form/PaymentForm';
import Spinner from 'src/view/shared/Spinner';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function PaymentFormPage(props) {
  const [dispatched, setDispatched] = useState(false);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const initLoading = useSelector(
    selectors.selectInitLoading,
  );
  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );
  const record = useSelector(selectors.selectStudent);

  useEffect(() => {
    dispatch(studentActions.doInit(match.params.id));
    setDispatched(true);
  }, [dispatch, match.params.id]);

  const doSubmit = (id, data) => {
    dispatch(actions.doCreate(id, data));
  };

  return (
    <>
      <Card>
        <MDBox py={2.4} px={2.4}>
          <MDBox
            pb={2.4}
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <MDTypography variant="h3">
              {i18n('payment.title.create')}
            </MDTypography>
          </MDBox>
          {initLoading && <Spinner />}

          {dispatched && !initLoading && (
            <PaymentForm
              saveLoading={saveLoading}
              initLoading={initLoading}
              record={record}
              onSubmit={doSubmit}
              onCancel={() => getHistory().push('/payment')}
            />
          )}
        </MDBox>
      </Card>
    </>
  );
}

export default PaymentFormPage;
