import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import actions from 'src/modules/teacher/form/teacherFormActions';
import selectors from 'src/modules/teacher/form/teacherFormSelectors';
import TeacherForm from 'src/view/teacher/form/TeacherForm';
import Spinner from 'src/view/shared/Spinner';

function TeacherFormPage(props) {
  const [dispatched, setDispatched] = useState(false);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const initLoading = useSelector(
    selectors.selectInitLoading,
  );

  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );

  const teacher = useSelector(selectors.selectTeacher);

  const isEditing = Boolean(match.params.id);

  const title = isEditing
    ? i18n('teacher.edit.title')
    : i18n('teacher.new.title');

  useEffect(() => {
    dispatch(actions.doInit(match.params.id));
    setDispatched(true);
  }, [dispatch, match.params.id]);

  const doSubmit = (id, data) => {
    if (isEditing) {
      dispatch(
        actions.doUpdate({
          id: id,
          ...data,
        }),
      );
    } else {
      dispatch(actions.doAdd(data));
    }
  };

  return (
    <>
      {initLoading && <Spinner />}

      {dispatched && !initLoading && (
        <TeacherForm
          saveLoading={saveLoading}
          initLoading={initLoading}
          teacher={teacher}
          title={title}
          isEditing={isEditing}
          onSubmit={doSubmit}
          onCancel={() =>
            isEditing
              ? getHistory().push(
                  `/admin/teacher/${match.params.id}`,
                )
              : getHistory().push('/admin/teacher')
          }
        />
      )}
    </>
  );
}

export default TeacherFormPage;
