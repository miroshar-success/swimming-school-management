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
import actions from 'src/modules/newsArticle/list/newsArticleListActions';
import DatePickerRangeFormItem from 'src/view/shared/form/items/DatePickerRangeFormItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterAccordion from 'src/view/shared/filter/FilterAccordion';
import FilterPreview from 'src/view/shared/filter/FilterPreview';
import filterRenders from 'src/modules/shared/filter/filterRenders';
import FilterWrapper, {
  FilterButtons,
} from 'src/view/shared/styles/FilterWrapper';
import formActions from 'src/modules/form/formActions';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDButton from 'src/mui/components/MDButton';
import SearchIcon from '@mui/icons-material/Search';
import selectors from 'src/modules/newsArticle/list/newsArticleListSelectors';
import TagAutocompleteFormItem from 'src/view/tag/autocomplete/TagAutocompleteFormItem';
import UndoIcon from '@mui/icons-material/Undo';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';

const schema = yup.object().shape({
  title: yupFilterSchemas.string(
    i18n('entities.newsArticle.fields.title'),
  ),
  link: yupFilterSchemas.string(
    i18n('entities.newsArticle.fields.link'),
  ),
  description: yupFilterSchemas.string(
    i18n('entities.newsArticle.fields.description'),
  ),
  dateRange: yupFilterSchemas.datetimeRange(
    i18n('entities.newsArticle.fields.dateRange'),
  ),
  favorites: yupFilterSchemas.boolean(
    i18n('entities.newsArticle.fields.favorites'),
  ),
  tags: yupFilterSchemas.relationToMany(
    i18n('entities.newsArticle.fields.tags'),
  ),
});

const emptyValues = {
  title: '',
  link: '',
  description: '',
  dateRange: [],
  favorites: null,
  tags: [],
};

const previewRenders = {
  title: {
    label: i18n('entities.newsArticle.fields.title'),
    render: filterRenders.generic(),
  },
  link: {
    label: i18n('entities.newsArticle.fields.link'),
    render: filterRenders.generic(),
  },
  description: {
    label: i18n('entities.newsArticle.fields.description'),
    render: filterRenders.generic(),
  },
  dateRange: {
    label: i18n('entities.newsArticle.fields.dateRange'),
    render: filterRenders.datetimeRange(),
  },
  favorites: {
    label: i18n('entities.newsArticle.fields.favorites'),
    render: filterRenders.enumerator('common.boolean'),
  },
  tags: {
    label: i18n('entities.newsArticle.fields.tags'),
    render: filterRenders.relationToMany('tag'),
  },
};

function NewsArticleListFilter(props) {
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
                <Grid item lg={6} xs={12}>
                  <InputFormItem
                    name="title"
                    label={i18n(
                      'entities.newsArticle.fields.title',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <InputFormItem
                    name="link"
                    label={i18n(
                      'entities.newsArticle.fields.link',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <InputFormItem
                    name="description"
                    label={i18n(
                      'entities.newsArticle.fields.description',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <DatePickerRangeFormItem
                    name="dateRange"
                    label={i18n(
                      'entities.newsArticle.fields.dateRange',
                    )}
                    variant="standard"
                    showTime
                  />
                </Grid>
                <Grid item xs={12}>
                  <TagAutocompleteFormItem
                    name="tags"
                    label={i18n(
                      'entities.newsArticle.fields.tags',
                    )}
                    required
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

export default NewsArticleListFilter;
