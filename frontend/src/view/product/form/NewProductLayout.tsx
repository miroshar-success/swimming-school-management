import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import GradientTitle from 'src/view/shared/components/GradientTitle';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import LogoFormItem from 'src/view/shared/form/items/LogoFormItem';
import MDBox from 'src/mui/components/MDBox';
import PriceFormItem from 'src/view/shared/form/items/PriceFormItem';
import ProductCategoryAutocompleteFormItem from 'src/view/productCategory/autocomplete/ProductCategoryAutocompleteFormItem';
import RatingFormItem from 'src/view/shared/form/items/RatingFormItem';
import Storage from 'src/security/storage';
import TagAutocompleteFormItem from 'src/view/tag/autocomplete/TagAutocompleteFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';

function NewProductLayout(props) {
  const { title } = props;
  return (
    <MDBox px={0.8}>
      <Grid spacing={1.6} container>
        <Grid item xs={12}>
          <GradientTitle>
            {title ?? i18n('entities.product.new.title')}
          </GradientTitle>
        </Grid>
        <Grid item md={8} xs={12}>
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
        <Grid item md={4} xs={12}>
          <Grid spacing={4} container>
            <Grid item xs={12}>
              <LogoFormItem
                name="logo"
                label={i18n('entities.product.fields.logo')}
                required={true}
                storage={Storage.values.productLogo}
                max={1}
              />
            </Grid>
            <Grid item xs={12}>
              <TagAutocompleteFormItem
                name="tags"
                label={i18n('entities.product.fields.tags')}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default NewProductLayout;
