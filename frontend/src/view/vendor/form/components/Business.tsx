import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import vendorEnumerators from 'src/modules/vendor/vendorEnumerators';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import Storage from 'src/security/storage';
import FilesFormItem from 'src/view/shared/form/items/FilesFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';

function BusinessSection({ visible }): JSX.Element {
  return (
    <MDBox display={visible ? 'block' : 'none'}>
      <MDBox lineHeight={0}>
        <MDTypography variant="h5">
          {i18n('entities.vendor.sections.business')}
        </MDTypography>
      </MDBox>
      <MDBox mt={1.3}>
        <Grid spacing={1.6} container>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <InputFormItem
              name="internalBusinessSponsor"
              label={i18n(
                'entities.vendor.fields.internalBusinessSponsor',
              )}
              required={false}
              variant="standard"
              autoFocus
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <SelectFormItem
              name="countryOfIncorporation"
              label={i18n(
                'entities.vendor.fields.countryOfIncorporation',
              )}
              options={vendorEnumerators.countryOfIncorporation.map(
                (value) => ({
                  value,
                  label: i18n(
                    `entities.vendor.enumerators.countryOfIncorporation.${value}`,
                  ),
                }),
              )}
              required={true}
              variant="standard"
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FilesFormItem
              name="contract"
              label={i18n(
                'entities.vendor.fields.contract',
              )}
              required={false}
              storage={Storage.values.vendorContract}
              max={undefined}
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default BusinessSection;
