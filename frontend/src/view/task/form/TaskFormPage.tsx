import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/task/form/taskFormActions';
import selectors from 'src/modules/task/form/taskFormSelectors';
import { getHistory } from 'src/modules/store';
import TaskForm from 'src/view/task/form/TaskForm';
import Spinner from 'src/view/shared/Spinner';
import { Grid } from '@mui/material';

function TaskFormPage(props) {
  const [dispatched, setDispatched] = useState(false);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const initLoading = useSelector(
    selectors.selectInitLoading,
  );
  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );
  const record = useSelector(selectors.selectRecord);

  const isEditing = Boolean(match.params.id);
  const title = isEditing
    ? i18n('entities.task.edit.title')
    : i18n('entities.task.new.title');

  useEffect(() => {
    dispatch(actions.doInit(match.params.id));
    setDispatched(true);
  }, [dispatch, match.params.id]);

  const doSubmit = (id, data) => {
    if (isEditing) {
      dispatch(actions.doUpdate(id, data));
    } else {
      dispatch(actions.doCreate(data));
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        {initLoading && <Spinner />}

        {dispatched && !initLoading && (
          <TaskForm
            saveLoading={saveLoading}
            initLoading={initLoading}
            record={record}
            isEditing={isEditing}
            hiddenImpossibleFields={!isEditing}
            onSubmit={doSubmit}
            onCancel={() =>
              isEditing
                ? getHistory().push(
                    `/task/${match.params.id}`,
                  )
                : getHistory().push('/task')
            }
          />
        )}
      </Grid>
    </Grid>
  );
}

export default TaskFormPage;
