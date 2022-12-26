import { Dialog, DialogContent } from '@mui/material';
import { getAbsoluteDateTimeByHour } from 'src/modules/utils';
import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Errors from 'src/modules/shared/error/errors';
import moment from 'moment';
import ReactDOM from 'react-dom';
import selectors from 'src/modules/taskInstance/form/taskInstanceFormSelectors';
import Spinner from 'src/view/shared/Spinner';
import TaskForm from 'src/view/task/form/TaskForm';
import taskInstanceFormActions from 'src/modules/taskInstance/form/taskInstanceFormActions';
import TaskInstanceService from 'src/modules/taskInstance/taskInstanceService';
import TaskService from 'src/modules/task/taskService';

function TaskFormModal(props) {
  const dispatch = useDispatch();
  const [saveLoading, setSaveLoading] = useState(false);
  const [dispatched, setDispatched] = useState(false);
  const dueDate = moment(props.dueDate);
  const mode =
    props.dueDate === null
      ? 'edit'
      : props.id
      ? 'recurring'
      : 'new';
  const title = i18n(
    `widgets.tasksOnCalendar.modals.${mode}.title`,
    dueDate.format('dddd, LL'),
  );

  const initLoading = useSelector(
    selectors.selectInitLoading,
  );

  const record = useSelector(selectors.selectRecord);

  const resetInfos =
    mode === 'edit' || !dispatched || initLoading
      ? {}
      : {
          dueDate: getAbsoluteDateTimeByHour(
            moment(record.dueDate ?? moment.now())
              .year(dueDate.year())
              .month(dueDate.month())
              .date(dueDate.date())
              .toISOString(),
          ).toISOString(),
          completedDate: null,
          status: null,
        };

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      if (mode === 'edit') {
        await TaskInstanceService.update(props.id, data);
      } else if (mode === 'recurring') {
        await TaskInstanceService.create({
          ...data,
          task: record.task?._id ?? null,
        });
      } else {
        await TaskService.create(data);
      }
      setSaveLoading(false);
      props.onSuccess();
    } catch (error) {
      Errors.handle(error);
    } finally {
      setSaveLoading(false);
    }
  };

  const doClose = () => {
    return props.onClose();
  };

  useEffect(() => {
    dispatch(taskInstanceFormActions.doInit(props.id));
    setDispatched(true);
  }, [dispatch, props.id]);

  return ReactDOM.createPortal(
    <Dialog
      open={true}
      onClose={doClose}
      maxWidth={mode === 'edit' ? 'xl' : 'md'}
      fullWidth={true}
    >
      <DialogContent>
        {initLoading && <Spinner />}
        {dispatched && !initLoading && (
          <TaskForm
            saveLoading={saveLoading}
            initLoading={initLoading}
            isEditing={mode === 'edit'}
            record={{
              ...record,
              ...resetInfos,
            }}
            hiddenImpossibleFields={mode !== 'edit'}
            onSubmit={doSubmit}
            onCancel={doClose}
            title={title}
            modal
          />
        )}
      </DialogContent>
    </Dialog>,
    (document as any).getElementById('modal-root'),
  );
}

export default TaskFormModal;
