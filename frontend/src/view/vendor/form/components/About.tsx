import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import vendorEnumerators from 'src/modules/vendor/vendorEnumerators';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import Storage from 'src/security/storage';
import ColorBadgeSelectFormItem, {
  generateColorBadgeSelectOptions,
} from 'src/view/shared/form/items/ColorBadgeSelectFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import LogoFormItem from 'src/view/shared/form/items/LogoFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import TagAutocompleteFormItem from 'src/view/tag/autocomplete/TagAutocompleteFormItem';
import VendorCategoryAutocompleteFormItem from 'src/view/vendorCategory/autocomplete/VendorCategoryAutocompleteFormItem';

function AboutSection({ visible }): JSX.Element {
  return (
    <MDBox display={visible ? 'block' : 'none'}>
      <MDBox lineHeight={0}>
        <MDTypography variant="h5">
          {i18n('entities.vendor.sections.about')}
        </MDTypography>
      </MDBox>
      <MDBox mt={1.3}>
        <Grid spacing={1.6} container>
          <Grid item md={6} xs={12}>
            <InputFormItem
              name="name"
              label={i18n('entities.vendor.fields.name')}
              required={true}
              variant="standard"
              autoFocus
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <VendorCategoryAutocompleteFormItem
              name="category"
              label={i18n(
                'entities.vendor.fields.category',
              )}
              variant="standard"
              fullWidth
              required={true}
              showCreate={true}
            />
          </Grid>
          <Grid item xs={12}>
            <TextAreaFormItem
              name="descriptionOfServices"
              label={i18n(
                'entities.vendor.fields.descriptionOfServices',
              )}
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <ColorBadgeSelectFormItem
              name="status"
              label={i18n('entities.vendor.fields.status')}
              options={generateColorBadgeSelectOptions(
                vendorEnumerators.status,
                vendorEnumerators.statusColor,
                'entities.vendor.enumerators.status',
              )}
              required={true}
              variant="standard"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <ColorBadgeSelectFormItem
              name="rating"
              label={i18n('entities.vendor.fields.rating')}
              options={generateColorBadgeSelectOptions(
                vendorEnumerators.rating,
                vendorEnumerators.ratingColor,
                'entities.vendor.enumerators.rating',
              )}
              required={true}
              variant="standard"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <SelectFormItem
              name="industry"
              label={i18n(
                'entities.vendor.fields.industry',
              )}
              options={vendorEnumerators.industry.map(
                (value) => ({
                  value,
                  label: i18n(
                    `entities.vendor.enumerators.industry.${value}`,
                  ),
                }),
              )}
              required={true}
              variant="standard"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <SelectFormItem
              name="dataProcessed"
              label={i18n(
                'entities.vendor.fields.dataProcessed',
              )}
              options={vendorEnumerators.dataProcessed.map(
                (value) => ({
                  value,
                  label: i18n(
                    `entities.vendor.enumerators.dataProcessed.${value}`,
                  ),
                }),
              )}
              required={true}
              variant="standard"
              mode="multiple"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <MDBox py={1.3}>
              <MDTypography variant="h5">
                {i18n('entities.vendor.fields.logo')}
              </MDTypography>
            </MDBox>
            <LogoFormItem
              name="logo"
              required={false}
              storage={Storage.values.vendorLogo}
              max={1}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <MDBox py={1.3}>
              <MDTypography variant="h5">
                {i18n('entities.vendor.fields.tags')}
              </MDTypography>
            </MDBox>
            <TagAutocompleteFormItem name="tags" />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default AboutSection;
