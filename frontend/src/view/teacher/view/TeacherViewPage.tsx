import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/teacher/view/teacherViewActions';
import selectors from 'src/modules/teacher/view/teacherViewSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import TeacherView from 'src/view/teacher/view/TeacherView';
import TeacherViewToolbar from 'src/view/teacher/view/TeacherViewToolbar';

function TeacherViewPage(props) {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const teacher = useSelector(selectors.selectTeacher);

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <>
      <MDBox px={2.4} pt={2.4}>
        <MDBox
          pb={2.4}
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <MDTypography variant="h3" mb={2.4}>
            {i18n('teacher.view.title')}
          </MDTypography>
          <TeacherViewToolbar match={match} />
        </MDBox>
        <TeacherView loading={loading} teacher={teacher} />
      </MDBox>
    </>
  );
}

export default TeacherViewPage;
