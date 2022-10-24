import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import organizationProfileEnumerators from 'src/modules/organizationProfile/organizationProfileEnumerators';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import InputNumberFormItem from 'src/view/shared/form/items/InputNumberFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';

function AboutSection({ visible }): JSX.Element {
  return (
    <MDBox display={visible ? 'block' : 'none'}>
      <MDBox lineHeight={0}>
        <MDTypography variant="h5">
          {i18n(
            'entities.organizationProfile.sections.about',
          )}
        </MDTypography>
      </MDBox>
      <MDBox mt={1.3}>
        <Grid spacing={1.6} container>
          <Grid item sm={12} xs={12}>
            <InputFormItem
              name="companyName"
              label={i18n(
                'entities.organizationProfile.fields.companyName',
              )}
              variant="standard"
              required={true}
              autoFocus
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <SelectFormItem
              name="industry"
              label={i18n(
                'entities.organizationProfile.fields.industry',
              )}
              options={organizationProfileEnumerators.industry.map(
                (value) => ({
                  value,
                  label: i18n(
                    `entities.organizationProfile.enumerators.industry.${value}`,
                  ),
                }),
              )}
              variant="standard"
              required={true}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <SelectFormItem
              name="employee"
              label={i18n(
                'entities.organizationProfile.fields.employee',
              )}
              options={organizationProfileEnumerators.employee.map(
                (value) => ({
                  value,
                  label: i18n(
                    `entities.organizationProfile.enumerators.employee.${value}`,
                  ),
                }),
              )}
              variant="standard"
              required={true}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <SelectFormItem
              name="thirdParties"
              label={i18n(
                'entities.organizationProfile.fields.thirdParties',
              )}
              options={organizationProfileEnumerators.thirdParties.map(
                (value) => ({
                  value,
                  label: i18n(
                    `entities.organizationProfile.enumerators.thirdParties.${value}`,
                  ),
                }),
              )}
              variant="standard"
              required={true}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <InputNumberFormItem
              name="location"
              label={i18n(
                'entities.organizationProfile.fields.location',
              )}
              variant="standard"
              required={true}
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default AboutSection;
