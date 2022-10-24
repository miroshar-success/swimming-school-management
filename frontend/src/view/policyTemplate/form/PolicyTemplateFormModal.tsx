import { Dialog, DialogContent } from '@mui/material';
import { useState } from 'react';
import Errors from 'src/modules/shared/error/errors';
import PolicyTemplateForm from 'src/view/policyTemplate/form/PolicyTemplateForm';
import PolicyTemplateService from 'src/modules/policyTemplate/policyTemplateService';
import ReactDOM from 'react-dom';

function PolicyTemplateFormModal(props) {
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } = await PolicyTemplateService.create(
        data,
      );
      const record = await PolicyTemplateService.find(id);
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
        <PolicyTemplateForm
          saveLoading={saveLoading}
          onSubmit={doSubmit}
          onCancel={doClose}
          modal
        />
      </DialogContent>
    </Dialog>,
    (document as any).getElementById('modal-root'),
  );
}

export default PolicyTemplateFormModal;
