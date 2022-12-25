import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import FilesFormItem from 'src/view/shared/form/items/FilesFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import Storage from 'src/security/storage';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';

function EditDocumentLayout(props) {
  return (
    <Card sx={{ height: '100%' }}>
      <MDBox p={2.4}>
        <Grid container spacing={1.6}>
          <Grid item xs={12}>
            <InputFormItem
              name="name"
              label={i18n('document.fields.name')}
              variant="standard"
              required={true}
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextAreaFormItem
              name="description"
              label={i18n('document.fields.description')}
              variant="standard"
              required={true}
            />
          </Grid>
          <Grid item xs={12}>
            <FilesFormItem
              name="attachment"
              label={i18n('document.fields.attachment')}
              required={true}
              storage={Storage.values.documentAttachment}
              max={1}
            />
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default EditDocumentLayout;
