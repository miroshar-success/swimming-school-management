import {
  AccordionDetails,
  AccordionSummary,
  Grid,
} from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import actions from 'src/modules/product/list/productListActions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterAccordion from 'src/view/shared/filter/FilterAccordion';
import FilterPreview from 'src/view/shared/filter/FilterPreview';
import filterRenders from 'src/modules/shared/filter/filterRenders';
import FilterWrapper, {
  FilterButtons,
} from 'src/view/shared/styles/FilterWrapper';
import formActions from 'src/modules/form/formActions';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import InputNumberRangeFormItem from 'src/view/shared/form/items/InputNumberRangeFormItem';
import MDButton from 'src/mui/components/MDButton';
import PriceRangeFormItem from 'src/view/shared/form/items/PriceRangeFormItem';
import ProductCategoryAutocompleteFormItem from 'src/view/productCategory/autocomplete/ProductCategoryAutocompleteFormItem';
import RatingRangeFormItem from 'src/view/shared/form/items/RatingRangeFormItem';
import SearchIcon from '@mui/icons-material/Search';
import selectors from 'src/modules/product/list/productListSelectors';
import TagAutocompleteFormItem from 'src/view/tag/autocomplete/TagAutocompleteFormItem';
import UndoIcon from '@mui/icons-material/Undo';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';

const schema = yup.object().shape({
  referenceRange: yupFilterSchemas.integerRange(
    i18n('entities.product.fields.referenceRange'),
  ),
  title: yupFilterSchemas.string(
    i18n('entities.product.fields.title'),
  ),
  category: yupFilterSchemas.relationToOne(
    i18n('entities.product.fields.category'),
  ),
  website: yupFilterSchemas.string(
    i18n('entities.product.fields.website'),
  ),
  ratingRange: yupFilterSchemas.decimalRange(
    i18n('entities.product.fields.ratingRange'),
  ),
  priceRange: yupFilterSchemas.integerRange(
    i18n('entities.product.fields.priceRange'),
  ),
  favorites: yupFilterSchemas.boolean(
    i18n('entities.product.fields.favorites'),
  ),
  tags: yupFilterSchemas.relationToMany(
    i18n('entities.product.fields.tags'),
  ),
});

const emptyValues = {
  referenceRange: [],
  title: '',
  category: '',
  website: '',
  ratingRange: [],
  priceRange: [],
  favorites: null,
  tags: [],
};

const previewRenders = {
  referenceRange: {
    label: i18n('entities.product.fields.referenceRange'),
    render: filterRenders.range(),
  },
  title: {
    label: i18n('entities.product.fields.title'),
    render: filterRenders.generic(),
  },
  category: {
    label: i18n('entities.product.fields.category'),
    render: filterRenders.relationToOne(),
  },
  website: {
    label: i18n('entities.product.fields.website'),
    render: filterRenders.generic(),
  },
  ratingRange: {
    label: i18n('entities.product.fields.ratingRange'),
    render: filterRenders.decimalRange(),
  },
  priceRange: {
    label: i18n('entities.product.fields.priceRange'),
    render: filterRenders.range(),
  },
  favorites: {
    label: i18n('entities.product.fields.favorites'),
    render: filterRenders.enumerator('common.boolean'),
  },
  tags: {
    label: i18n('entities.product.fields.tags'),
    render: filterRenders.relationToMany('tag'),
  },
};

function ProductListFilter(props) {
  const { sidenavColor } = selectMuiSettings();
  const rawFilter = useSelector(selectors.selectRawFilter);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const [initialValues] = useState(() => {
    return {
      ...emptyValues,
      ...rawFilter,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    mode: 'onSubmit',
  });

  useEffect(() => {
    dispatch(
      actions.doFetch(
        schema.cast(initialValues),
        initialValues,
      ),
    );
    // eslint-disable-next-line
  }, [dispatch]);

  const onSubmit = (values) => {
    const rawValues = form.getValues();
    dispatch(actions.doFetch(values, rawValues, false));
    setExpanded(false);
    dispatch(formActions.doRefresh());
  };

  const onReset = () => {
    Object.keys(emptyValues).forEach((key) => {
      form.setValue(key, emptyValues[key]);
    });
    dispatch(actions.doReset());
    setExpanded(false);
    dispatch(formActions.doRefresh());
  };

  const onRemove = (key) => {
    form.setValue(key, emptyValues[key]);
    dispatch(formActions.doRefresh());
    return form.handleSubmit(onSubmit)();
  };

  return (
    <FilterWrapper>
      <FilterAccordion
        expanded={expanded}
        onChange={(event, isExpanded) =>
          setExpanded(isExpanded)
        }
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color="secondary" />}
        >
          <FilterPreview
            values={rawFilter}
            renders={previewRenders}
            expanded={expanded}
            onRemove={onRemove}
          />
        </AccordionSummary>
        <AccordionDetails>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Grid container spacing={1.6}>
                <Grid item md={6} xs={12}>
                  <InputNumberRangeFormItem
                    name="referenceRange"
                    label={i18n(
                      'entities.product.fields.referenceRange',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputFormItem
                    name="title"
                    label={i18n(
                      'entities.product.fields.title',
                    )}
                    variant="standard"
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
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputFormItem
                    name="website"
                    label={i18n(
                      'entities.product.fields.website',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <RatingRangeFormItem
                    name="ratingRange"
                    label={i18n(
                      'entities.product.fields.ratingRange',
                    )}
                    precision={0.1}
                    showValue
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <PriceRangeFormItem
                    name="priceRange"
                    label={i18n(
                      'entities.product.fields.priceRange',
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TagAutocompleteFormItem
                    name="tags"
                    label={i18n(
                      'entities.product.fields.tags',
                    )}
                  />
                </Grid>
              </Grid>

              <FilterButtons>
                <MDButton
                  variant="gradient"
                  color={sidenavColor}
                  type="submit"
                  disabled={props.loading}
                  startIcon={<SearchIcon />}
                  size="small"
                >
                  {i18n('common.search')}
                </MDButton>

                <MDButton
                  variant="outlined"
                  color={sidenavColor}
                  type="button"
                  onClick={onReset}
                  disabled={props.loading}
                  startIcon={<UndoIcon />}
                  size="small"
                >
                  {i18n('common.reset')}
                </MDButton>
              </FilterButtons>
            </form>
          </FormProvider>
        </AccordionDetails>
      </FilterAccordion>
    </FilterWrapper>
  );
}

export default ProductListFilter;
