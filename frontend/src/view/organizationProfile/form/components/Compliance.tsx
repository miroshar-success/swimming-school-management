import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import organizationProfileEnumerators from 'src/modules/organizationProfile/organizationProfileEnumerators';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';

function ComplianceSection({ visible }): JSX.Element {
  return (
    <MDBox display={visible ? 'block' : 'none'}>
      <MDBox lineHeight={0}>
        <MDTypography variant="h5">
          {i18n(
            'entities.organizationProfile.sections.compliance',
          )}
        </MDTypography>
      </MDBox>
      <MDBox mt={1.3}>
        <Grid spacing={1.6} container>
          <Grid item sm={12} xs={12}>
            <SelectFormItem
              name="regulatoryCompliance"
              label={i18n(
                'entities.organizationProfile.fields.regulatoryCompliance',
              )}
              options={organizationProfileEnumerators.regulatoryCompliance.map(
                (value) => ({
                  value,
                  label: i18n(
                    `entities.organizationProfile.enumerators.regulatoryCompliance.${value}`,
                  ),
                }),
              )}
              variant="standard"
              required={true}
              mode="multiple"
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default ComplianceSection;
