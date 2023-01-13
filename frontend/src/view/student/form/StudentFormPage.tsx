import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import actions from 'src/modules/student/form/studentFormActions';
import selectors from 'src/modules/student/form/studentFormSelectors';
import StudentForm from 'src/view/student/form/StudentForm';
import Spinner from 'src/view/shared/Spinner';

function StudentFormPage(props) {
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

  const isEditing = Boolean(match.params.id);

  const title = isEditing
    ? i18n('student.edit.title')
    : i18n('student.new.title');

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
        <StudentForm
          saveLoading={saveLoading}
          initLoading={initLoading}
          student={student}
          title={title}
          isEditing={isEditing}
          onSubmit={doSubmit}
          onCancel={() =>
            isEditing
              ? getHistory().push(
                  `/admin/student/${match.params.id}`,
                )
              : getHistory().push('/admin/student')
          }
        />
      )}
    </>
  );
}

export default StudentFormPage;
