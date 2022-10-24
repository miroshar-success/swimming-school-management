import { Dialog, DialogContent } from '@mui/material';
import { useState } from 'react';
import Errors from 'src/modules/shared/error/errors';
import ReactDOM from 'react-dom';
import RiskForm from 'src/view/risk/form/RiskForm';
import RiskService from 'src/modules/risk/riskService';

function RiskFormModal(props) {
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } = await RiskService.create(data);
      const record = await RiskService.find(id);
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
        <RiskForm
          saveLoading={saveLoading}
          onSubmit={doSubmit}
          onCancel={doClose}
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

export default RiskFormModal;
