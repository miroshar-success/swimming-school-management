import { Card } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/student/view/studentViewActions';
import selectors from 'src/modules/student/view/studentViewSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PaymentHistoryView from 'src/view/paymentHistory/view/PaymentHistoryView';
import PaymentHistoryViewToolbar from 'src/view/paymentHistory/view/PaymentHistoryViewToolbar';

function PaymentHistoryViewPage(props) {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const student = useSelector(selectors.selectStudent);

  useEffect(() => {
    dispatch(actions.doFind(match.params.userId));
  }, [dispatch, match.params.userId]);

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
            <PaymentHistoryViewToolbar match={match} />
          </MDBox>
          <PaymentHistoryView
            loading={loading}
            student={student}
            paymentId={match.params?.paymentId}
          />
        </MDBox>
      </Card>
    </>
  );
}

export default PaymentHistoryViewPage;
