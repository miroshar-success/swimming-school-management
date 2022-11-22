import { Card } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import actions from 'src/modules/teacher/form/teacherFormActions';
import selectors from 'src/modules/teacher/form/teacherFormSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import Spinner from 'src/view/shared/Spinner';
import PageTitle from 'src/view/shared/styles/PageTitle';
import TeacherEditForm from 'src/view/teacher/edit/TeacherEditForm';

function TeacherEditPage(props) {
  const dispatch = useDispatch();
  const [dispatched, setDispatched] = useState(false);

  const initLoading = useSelector(
    selectors.selectInitLoading,
  );

  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );

  const teacher = useSelector(selectors.selectTeacher);

  const match = useRouteMatch();

  useEffect(() => {
    dispatch(actions.doInit(match.params.id));
    setDispatched(true);
  }, [dispatch, match.params.id]);

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
              {i18n('teacher.edit.title')}
            </MDTypography>
          </MDBox>
          {initLoading && <Spinner />}

          {dispatched && !initLoading && (
            <TeacherEditForm
              teacher={teacher}
              saveLoading={saveLoading}
              onCancel={() => getHistory().push('/teacher')}
            />
          )}
        </MDBox>
      </Card>
    </>
  );
}

export default TeacherEditPage;
