import { Dialog, DialogContent } from '@mui/material';
import { useState } from 'react';
import Errors from 'src/modules/shared/error/errors';
import ReactDOM from 'react-dom';
import TaskForm from 'src/view/task/form/TaskForm';
import TaskService from 'src/modules/task/taskService';

function TaskFormModal(props) {
  const { hiddenImpossibleFields } = props;
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } = await TaskService.create(data);
      const record = await TaskService.find(id);
      setSaveLoading(false);
      props.onSuccess(record);
    } catch (error) {
      Errors.handle(error);
    } finally {
      setSaveLoading(false);
    }
  };

  const doClose = () => {
    return props.onClose();
  };

  return ReactDOM.createPortal(
    <Dialog
      open={true}
      onClose={doClose}
      maxWidth="md"
      fullWidth={true}
    >
      <DialogContent>
        <TaskForm
          saveLoading={saveLoading}
          onSubmit={doSubmit}
          onCancel={doClose}
          hiddenImpossibleFields={hiddenImpossibleFields}
          record={{
            newsArticles: props.newsArticles,
            products: props.products,
            policyTemplates: props.policyTemplates,
            policies: props.policies,
          }}
          modal
        />
      </DialogContent>
    </Dialog>,
    (document as any).getElementById('modal-root'),
  );
}

export default TaskFormModal;
