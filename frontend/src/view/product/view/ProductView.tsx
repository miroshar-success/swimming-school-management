import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import CreationInfo from 'src/view/shared/view/CreationInfo';
import LogoViewItem from 'src/view/shared/view/LogoViewItem';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PriceViewItem from 'src/view/shared/view/PriceViewItem';
import ProductCategoryViewItem from 'src/view/productCategory/view/ProductCategoryViewItem';
import ProductService from 'src/modules/product/productService';
import RatingViewItem from 'src/view/shared/view/RatingViewItem';
import Spinner from 'src/view/shared/Spinner';
import TagAutocompleteForm from 'src/view/tag/autocomplete/TagAutocompleteForm';
import TextViewItem from 'src/view/shared/view/TextViewItem';

function ProductView(props) {
  const renderView = () => {
    const { record } = props;

    return (
      <Grid spacing={1.6} container>
        <Grid item md={8} xs={12}>
          <Card sx={{ height: '100%' }}>
            <MDBox position="relative" p={2.4}>
              <MDTypography
                position="absolute"
                top={0}
                right={0}
                p={1.6}
                textAlign="right"
                variant="button"
                color="text"
                fontWeight="bold"
              >{`# ${record.reference}`}</MDTypography>
              <Grid spacing={1.6} container>
                <Grid item md={6} xs={12}>
                  <MDTypography variant="h3">
                    {record.title}
                  </MDTypography>
                </Grid>
                <Grid item md={6} xs={12}>
                  <ProductCategoryViewItem
                    label={i18n(
                      'entities.product.fields.category',
                    )}
                    value={record.category}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.product.fields.description',
                    )}
                    value={record.description}
                    multiline
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.product.fields.website',
                    )}
                    value={record.website}
                  />
                </Grid>
                <Grid item xs={12}>
                  <RatingViewItem
                    label={i18n(
                      'entities.product.fields.rating',
                    )}
                    value={record.rating}
                    precision={0.1}
                    showValue
                  />
                </Grid>
                <Grid item xs={12}>
                  <PriceViewItem
                    label={i18n(
                      'entities.product.fields.price',
                    )}
                    value={record.price}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CreationInfo {...props} />
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
                        {i18n(
                          'entities.product.fields.logo',
                        )}
                      </MDTypography>
                    </Grid>
                    <Grid xs={12} item>
                      <LogoViewItem
                        label={i18n(
                          'entities.product.fields.logo',
                        )}
                        value={record.logo}
                        hiddenLabel
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
                        {i18n(
                          'entities.product.fields.tags',
                        )}
                      </MDTypography>
                    </Grid>
                    <Grid xs={12} item>
                      <TagAutocompleteForm
                        name="tags"
                        id={record.id}
                        handleService={ProductService.tags}
                        tags={record.tags}
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return renderView();
}

export default ProductView;
