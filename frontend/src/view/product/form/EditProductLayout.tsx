import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import LogoFormItem from 'src/view/shared/form/items/LogoFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PriceFormItem from 'src/view/shared/form/items/PriceFormItem';
import ProductCategoryAutocompleteFormItem from 'src/view/productCategory/autocomplete/ProductCategoryAutocompleteFormItem';
import RatingFormItem from 'src/view/shared/form/items/RatingFormItem';
import Storage from 'src/security/storage';
import TagAutocompleteFormItem from 'src/view/tag/autocomplete/TagAutocompleteFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';

function EditProductLayout(props) {
  const { initialValues } = props;
  return (
    <Grid spacing={1.6} container>
      <Grid item md={8} xs={12}>
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
                    {i18n('entities.product.info')}
                  </MDTypography>
                  <MDTypography
                    variant="button"
                    color="text"
                    fontWeight="bold"
                  >
                    {`# ${initialValues.reference}`}
                  </MDTypography>
                </MDBox>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1.6}>
                  <Grid item md={6} xs={12}>
                    <InputFormItem
                      name="title"
                      label={i18n(
                        'entities.product.fields.title',
                      )}
                      variant="standard"
                      required={true}
                      autoFocus
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <ProductCategoryAutocompleteFormItem
                      name="category"
                      label={i18n(
                        'entities.product.fields.category',
                      )}
                      variant="standard"
                      fullWidth
                      required={true}
                      showCreate={true}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextAreaFormItem
                      name="description"
                      label={i18n(
                        'entities.product.fields.description',
                      )}
                      variant="standard"
                      required={true}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputFormItem
                      name="website"
                      label={i18n(
                        'entities.product.fields.website',
                      )}
                      variant="standard"
                      required={true}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <RatingFormItem
                      name="rating"
                      label={i18n(
                        'entities.product.fields.rating',
                      )}
                      precision={0.1}
                      showValue
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <PriceFormItem
                      name="price"
                      label={i18n(
                        'entities.product.fields.price',
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </Grid>
      <Grid item md={4} xs={12}>
        <Grid height="100%" container>
          <Grid xs={12} pb={1.6} item>
            <Card sx={{ height: '100%' }}>
              <MDBox p={2.4}>
                <Grid spacing={1.6} container>
                  <Grid xs={12} item>
                    <MDTypography variant="h5">
                      {i18n('entities.product.fields.logo')}
                    </MDTypography>
                  </Grid>
                  <Grid xs={12} item>
                    <LogoFormItem
                      name="logo"
                      required={true}
                      storage={Storage.values.productLogo}
                      max={1}
                    />
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
          <Grid xs={12} item>
            <Card sx={{ height: '100%' }}>
              <MDBox p={2.4}>
                <Grid spacing={1.6} container>
                  <Grid xs={12} item>
                    <MDTypography variant="h5">
                      {i18n('entities.product.fields.tags')}
                    </MDTypography>
                  </Grid>
                  <Grid xs={12} item>
                    <TagAutocompleteFormItem name="tags" />
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default EditProductLayout;
