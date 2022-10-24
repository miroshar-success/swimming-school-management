import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { i18n } from 'src/i18n';
import NewsFavoriteForm from 'src/view/newsFavorite/form/NewsFavoriteForm';
import NewsFavoriteService from 'src/modules/newsFavorite/newsFavoriteService';
import Errors from 'src/modules/shared/error/errors';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDTypography from 'src/mui/components/MDTypography';
import MDBox from 'src/mui/components/MDBox';

function NewsFavoriteFormModal(props) {
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } = await NewsFavoriteService.create(data);
      const record = await NewsFavoriteService.find(id);
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
      <DialogTitle>
        <MDBox
          display="flex"
          justifyContent="space-between"
        >
          <MDTypography>
            {i18n('entities.newsFavorite.new.title')}
          </MDTypography>
          <IconButton
            color="secondary"
            onClick={doClose}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </MDBox>
      </DialogTitle>
      <DialogContent>
        <NewsFavoriteForm
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

export default NewsFavoriteFormModal;
