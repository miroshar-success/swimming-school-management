import { Dialog, DialogContent } from '@mui/material';
import { useState } from 'react';
import Errors from 'src/modules/shared/error/errors';
import ProductForm from 'src/view/product/form/ProductForm';
import ProductService from 'src/modules/product/productService';
import ReactDOM from 'react-dom';

function ProductFormModal(props) {
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } = await ProductService.create(data);
      const record = await ProductService.find(id);
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
        <ProductForm
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

export default ProductFormModal;
