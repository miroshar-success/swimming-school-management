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
import actions from 'src/modules/policy/list/policyListActions';
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
import InputNumberRangeFormItem from 'src/view/shared/form/items/InputNumberRangeFormItem';
import MDButton from 'src/mui/components/MDButton';
import policyEnumerators from 'src/modules/policy/policyEnumerators';
import SearchIcon from '@mui/icons-material/Search';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import selectors from 'src/modules/policy/list/policyListSelectors';
import TagAutocompleteFormItem from 'src/view/tag/autocomplete/TagAutocompleteFormItem';
import UndoIcon from '@mui/icons-material/Undo';
import UserAutocompleteFormItem from 'src/view/user/autocomplete/UserAutocompleteFormItem';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';

const schema = yup.object().shape({
  name: yupFilterSchemas.string(
    i18n('entities.policy.fields.name'),
  ),
  type: yupFilterSchemas.enumerator(
    i18n('entities.policy.fields.type'),
  ),
  versionRange: yupFilterSchemas.integerRange(
    i18n('entities.policy.fields.versionRange'),
  ),
  lastPublishedDateRange: yupFilterSchemas.dateRange(
    i18n('entities.policy.fields.lastPublishedDateRange'),
  ),
  publishedBy: yupFilterSchemas.relationToOne(
    i18n('entities.policy.fields.publishedBy'),
  ),
  link: yupFilterSchemas.string(
    i18n('entities.policy.fields.link'),
  ),
  favorites: yupFilterSchemas.boolean(
    i18n('entities.policy.fields.favorites'),
  ),
  tags: yupFilterSchemas.relationToMany(
    i18n('entities.policy.fields.tags'),
  ),
});

const emptyValues = {
  name: '',
  type: '',
  versionRange: [],
  lastPublishedDateRange: [],
  publishedBy: '',
  link: '',
  favorites: null,
  tags: [],
};

const previewRenders = {
  name: {
    label: i18n('entities.policy.fields.name'),
    render: filterRenders.generic(),
  },
  type: {
    label: i18n('entities.policy.fields.type'),
    render: filterRenders.enumerator(
      'entities.policy.enumerators.type',
    ),
  },
  versionRange: {
    label: i18n('entities.policy.fields.versionRange'),
    render: filterRenders.range(),
  },
  lastPublishedDateRange: {
    label: i18n(
      'entities.policy.fields.lastPublishedDateRange',
    ),
    render: filterRenders.dateRange(),
  },
  publishedBy: {
    label: i18n('entities.policy.fields.publishedBy'),
    render: filterRenders.relationToOne(),
  },
  link: {
    label: i18n('entities.policy.fields.link'),
    render: filterRenders.generic(),
  },
  favorites: {
    label: i18n('entities.policy.fields.favorites'),
    render: filterRenders.enumerator('common.boolean'),
  },
  tags: {
    label: i18n('entities.policy.fields.tags'),
    render: filterRenders.relationToMany('tag'),
  },
};

function PolicyListFilter(props) {
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
        rawFilter,
      ),
    );
    // eslint-disable-next-line
  }, [dispatch]);

  const onSubmit = (values) => {
    const rawValues = form.getValues();
    dispatch(actions.doFetch(values, rawValues));
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
              <Grid container spacing={2}>
                <Grid item lg={6} xs={12}>
                  <InputFormItem
                    name="name"
                    label={i18n(
                      'entities.policy.fields.name',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <SelectFormItem
                    name="type"
                    label={i18n(
                      'entities.policy.fields.type',
                    )}
                    options={policyEnumerators.type.map(
                      (value) => ({
                        value,
                        label: i18n(
                          `entities.policy.enumerators.type.${value}`,
                        ),
                      }),
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <InputNumberRangeFormItem
                    name="versionRange"
                    label={i18n(
                      'entities.policy.fields.versionRange',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <DatePickerRangeFormItem
                    name="lastPublishedDateRange"
                    label={i18n(
                      'entities.policy.fields.lastPublishedDateRange',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <UserAutocompleteFormItem
                    name="publishedBy"
                    label={i18n(
                      'entities.policy.fields.publishedBy',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <InputFormItem
                    name="link"
                    label={i18n(
                      'entities.policy.fields.link',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TagAutocompleteFormItem
                    name="tags"
                    label={i18n(
                      'entities.policy.fields.tags',
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

export default PolicyListFilter;
