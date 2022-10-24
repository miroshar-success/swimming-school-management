import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import FilesFormItem from 'src/view/shared/form/items/FilesFormItem';
import GradientTitle from 'src/view/shared/components/GradientTitle';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import policyEnumerators from 'src/modules/policy/policyEnumerators';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import Storage from 'src/security/storage';
import TagAutocompleteFormItem from 'src/view/tag/autocomplete/TagAutocompleteFormItem';

function NewPolicyLayout(props) {
  const { title } = props;
  return (
    <MDBox px={0.8}>
      <Grid spacing={1.6} container>
        <Grid item xs={12}>
          <GradientTitle>
            {title ?? i18n('entities.policy.new.title')}
          </GradientTitle>
        </Grid>
        <Grid item xs={12}>
          <Grid spacing={1.6} container>
            <Grid xs={12} item>
              <InputFormItem
                name="name"
                label={i18n('entities.policy.fields.name')}
                required={true}
                variant="standard"
                autoFocus
              />
            </Grid>
            <Grid xs={12} item>
              <SelectFormItem
                name="type"
                label={i18n('entities.policy.fields.type')}
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
                label={i18n('entities.policy.fields.link')}
                variant="standard"
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <TagAutocompleteFormItem
                name="tags"
                label={i18n('entities.policy.fields.tags')}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default NewPolicyLayout;
