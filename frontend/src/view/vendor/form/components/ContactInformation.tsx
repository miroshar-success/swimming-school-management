import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import Storage from 'src/security/storage';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';

function ContactInformationSection({
  visible,
}): JSX.Element {
  return (
    <MDBox display={visible ? 'block' : 'none'}>
      <MDBox lineHeight={0}>
        <MDTypography variant="h5">
          {i18n(
            'entities.vendor.sections.contactInformation',
          )}
        </MDTypography>
      </MDBox>
      <MDBox mt={1.3}>
        <Grid spacing={1.6} container>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <InputFormItem
              name="primaryContactName"
              label={i18n(
                'entities.vendor.fields.primaryContactName',
              )}
              variant="standard"
              required={true}
              autoFocus
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <InputFormItem
              name="primaryContactEmail"
              label={i18n(
                'entities.vendor.fields.primaryContactEmail',
              )}
              variant="standard"
              required={true}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <InputFormItem
              name="primaryContactPhoneNumber"
              label={i18n(
                'entities.vendor.fields.primaryContactPhoneNumber',
              )}
              variant="standard"
              required={false}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <InputFormItem
              name="supportEmail"
              label={i18n(
                'entities.vendor.fields.supportEmail',
              )}
              required={false}
              variant="standard"
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <InputFormItem
              name="supportPhoneNumber"
              label={i18n(
                'entities.vendor.fields.supportPhoneNumber',
              )}
              required={false}
              variant="standard"
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <InputFormItem
              name="website"
              label={i18n('entities.vendor.fields.website')}
              required={false}
              variant="standard"
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextAreaFormItem
              name="address"
              label={i18n('entities.vendor.fields.address')}
              required={false}
              variant="standard"
              fullWidth
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default ContactInformationSection;
