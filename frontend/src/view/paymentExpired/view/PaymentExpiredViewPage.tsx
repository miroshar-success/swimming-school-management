import { Card } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/student/view/studentViewActions';
import selectors from 'src/modules/student/view/studentViewSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PaymentExpiredView from 'src/view/paymentExpired/view/PaymentExpiredView';
import PaymentExpiredViewToolbar from 'src/view/paymentExpired/view/PaymentExpiredViewToolbar';

function PaymentExpiredViewPage(props) {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const student = useSelector(selectors.selectStudent);

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <>
      <Card>
        <MDBox px={2.4} pt={2.4}>
          <MDBox
            pb={2.4}
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <MDTypography variant="h3" mb={2.4}>
              {i18n('student.view.title')}
            </MDTypography>
            <PaymentExpiredViewToolbar match={match} />
          </MDBox>
          <PaymentExpiredView
            loading={loading}
            student={student}
          />
        </MDBox>
      </Card>
    </>
  );
}

export default PaymentExpiredViewPage;
