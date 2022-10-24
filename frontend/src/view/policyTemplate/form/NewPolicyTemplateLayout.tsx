import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import FilesFormItem from 'src/view/shared/form/items/FilesFormItem';
import GradientTitle from 'src/view/shared/components/GradientTitle';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import Storage from 'src/security/storage';
import TagAutocompleteFormItem from 'src/view/tag/autocomplete/TagAutocompleteFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';

function NewPolicyTemplateLayout(props) {
  const { title } = props;
  return (
    <MDBox px={0.8}>
      <Grid spacing={1.6} container>
        <Grid item xs={12}>
          <GradientTitle>
            {title ??
              i18n('entities.policyTemplate.new.title')}
          </GradientTitle>
        </Grid>
        <Grid item xs={12}>
          <InputFormItem
            name="name"
            label={i18n(
              'entities.policyTemplate.fields.name',
            )}
            variant="standard"
            required={true}
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextAreaFormItem
            name="description"
            label={i18n(
              'entities.policyTemplate.fields.description',
            )}
            variant="standard"
            required={true}
          />
        </Grid>
        <Grid item xs={12}>
          <FilesFormItem
            name="attachment"
            label={i18n(
              'entities.policyTemplate.fields.attachment',
            )}
            required={true}
            storage={
              Storage.values.policyTemplateAttachment
            }
            max={1}
          />
        </Grid>
        <Grid item xs={12}>
          <TagAutocompleteFormItem
            name="tags"
            label={i18n(
              'entities.policyTemplate.fields.tags',
            )}
          />
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default NewPolicyTemplateLayout;
