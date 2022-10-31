import { Card } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import actions from 'src/modules/user/form/userFormActions';
import selectors from 'src/modules/user/form/userFormSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import StudentNewForm from 'src/view/student/new/StudentNewForm';

function StudentNewPage(props) {
  const dispatch = useDispatch();

  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );

  useEffect(() => {
    dispatch(actions.doInit());
  }, [dispatch]);

  const doSubmit = (id, data) => {
    dispatch(actions.doAdd(data));
  };

  return (
    <>
      <Card>
        <MDBox px={2.4} py={2.4}>
          <MDBox
            pb={2.4}
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <MDTypography variant="h3">
              {i18n('student.new.title')}
            </MDTypography>
          </MDBox>
          <StudentNewForm
            saveLoading={saveLoading}
            onSubmit={doSubmit}
            onCancel={() => getHistory().push('/student')}
          />
        </MDBox>
      </Card>
    </>
  );
}

export default StudentNewPage;
