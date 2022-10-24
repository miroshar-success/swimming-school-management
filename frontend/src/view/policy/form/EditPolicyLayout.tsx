import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import FilesFormItem from 'src/view/shared/form/items/FilesFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import policyEnumerators from 'src/modules/policy/policyEnumerators';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import Storage from 'src/security/storage';
import TagAutocompleteFormItem from 'src/view/tag/autocomplete/TagAutocompleteFormItem';

function EditPolicyLayout(props) {
  const { initialValues } = props;
  return (
    <Card>
      <MDBox p={2.4}>
        <Grid spacing={1.6} container>
          <Grid item xs={12}>
            <MDBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <MDTypography variant="h5">
                {i18n('entities.policy.info')}
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12}>
            <Grid spacing={1.6} container>
              <Grid xs={12} item>
                <InputFormItem
                  name="name"
                  label={i18n(
                    'entities.policy.fields.name',
                  )}
                  variant="standard"
                  required={true}
                  autoFocus
                />
              </Grid>
              <Grid xs={12} item>
                <SelectFormItem
                  name="type"
                  label={i18n(
                    'entities.policy.fields.type',
                  )}
                  hint={i18n('entities.policy.hints.type')}
                  options={policyEnumerators.type.map(
                    (value) => ({
                      value,
                      label: i18n(
                        `entities.policy.enumerators.type.${value}`,
                      ),
                    }),
                  )}
                  variant="standard"
                  required={true}
                />
              </Grid>
              <Grid xs={12} item>
                <FilesFormItem
                  name="attachment"
                  label={i18n(
                    'entities.policy.fields.attachment',
                  )}
                  required={true}
                  storage={Storage.values.policyAttachment}
                  max={1}
                />
              </Grid>
              <Grid xs={12} item>
                <InputFormItem
                  name="link"
                  label={i18n(
                    'entities.policy.fields.link',
                  )}
                  variant="standard"
                  required={true}
                />
              </Grid>
              <Grid item xs={12}>
                <TagAutocompleteFormItem
                  name="tags"
                  label={i18n(
                    'entities.policy.fields.tags',
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default EditPolicyLayout;
