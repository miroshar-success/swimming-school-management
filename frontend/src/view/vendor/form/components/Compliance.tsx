import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import Storage from 'src/security/storage';
import CheckboxFormItem from 'src/view/shared/form/items/CheckboxFormItem';
import FilesFormItem from 'src/view/shared/form/items/FilesFormItem';

function ComplianceSection({ visible }): JSX.Element {
  return (
    <MDBox display={visible ? 'block' : 'none'}>
      <MDBox lineHeight={0}>
        <MDTypography variant="h5">
          {i18n('entities.vendor.sections.compliance')}
        </MDTypography>
      </MDBox>
      <MDBox mt={1.3}>
        <Grid spacing={1.6} container>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FilesFormItem
              name="documentation"
              label={i18n(
                'entities.vendor.fields.documentation',
              )}
              required={false}
              storage={Storage.values.vendorDocumentation}
              max={undefined}
            />
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <CheckboxFormItem
              name="dpiaCompleted"
              label={i18n(
                'entities.vendor.fields.dpiaCompleted',
              )}
            />
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <CheckboxFormItem
              name="dtiaCompleted"
              label={i18n(
                'entities.vendor.fields.dtiaCompleted',
              )}
            />
          </Grid>
          <Grid item lg={4} md={4} xs={12}></Grid>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <CheckboxFormItem
              name="gdpr"
              label={i18n('entities.vendor.fields.gdpr')}
            />
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <CheckboxFormItem
              name="ccpa"
              label={i18n('entities.vendor.fields.ccpa')}
            />
          </Grid>
          <Grid item lg={4} md={4} xs={12}></Grid>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <CheckboxFormItem
              name="iso27001"
              label={i18n(
                'entities.vendor.fields.iso27001',
              )}
            />
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <CheckboxFormItem
              name="soc1"
              label={i18n('entities.vendor.fields.soc1')}
            />
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <CheckboxFormItem
              name="soc2"
              label={i18n('entities.vendor.fields.soc2')}
            />
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <CheckboxFormItem
              name="hippa"
              label={i18n('entities.vendor.fields.hippa')}
            />
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <CheckboxFormItem
              name="pcidss"
              label={i18n('entities.vendor.fields.pcidss')}
            />
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <CheckboxFormItem
              name="fedramp"
              label={i18n('entities.vendor.fields.fedramp')}
            />
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <CheckboxFormItem
              name="sox"
              label={i18n('entities.vendor.fields.sox')}
            />
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <CheckboxFormItem
              name="cobit"
              label={i18n('entities.vendor.fields.cobit')}
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default ComplianceSection;
