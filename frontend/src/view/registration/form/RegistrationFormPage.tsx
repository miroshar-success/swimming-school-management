import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/registration/form/registrationFormActions';
import studentActions from 'src/modules/student/form/studentFormActions';
import selectors from 'src/modules/student/form/studentFormSelectors';
import { getHistory } from 'src/modules/store';
import RegistrationForm from 'src/view/registration/form/RegistrationForm';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import Spinner from 'src/view/shared/Spinner';
import PageTitle from 'src/view/shared/styles/PageTitle';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function RegistrationFormPage(props) {
  const [dispatched, setDispatched] = useState(false);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const initLoading = useSelector(
    selectors.selectInitLoading,
  );
  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );
  const student = useSelector(selectors.selectStudent);

  useEffect(() => {
    dispatch(studentActions.doInit(match.params.id));
    setDispatched(true);
  }, [dispatch, match.params.id]);

  const doSubmit = (id, data) => {
    let lessons = data.lessons;
    dispatch(
      actions.doRegisterLessons({
        lessons,
        id,
      }),
    );
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
              {i18n('registration.registerLessons')}
            </MDTypography>
          </MDBox>
          {initLoading && <Spinner />}

          {dispatched && !initLoading && (
            <RegistrationForm
              saveLoading={saveLoading}
              initLoading={initLoading}
              student={student}
              onSubmit={doSubmit}
              onCancel={() =>
                getHistory().push('/registration')
              }
            />
          )}
        </MDBox>
      </Card>
    </>
  );
}

export default RegistrationFormPage;
