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
import actions from 'src/modules/class/list/classListActions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterAccordion from 'src/view/shared/filter/FilterAccordion';
import FilterPreview from 'src/view/shared/filter/FilterPreview';
import filterRenders from 'src/modules/shared/filter/filterRenders';
import FilterWrapper, {
  FilterButtons,
} from 'src/view/shared/styles/FilterWrapper';
import formActions from 'src/modules/form/formActions';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import SearchIcon from '@mui/icons-material/Search';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import selectors from 'src/modules/class/list/classListSelectors';
import UndoIcon from '@mui/icons-material/Undo';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';
import ClassCategoryAutocompleteFormItem from 'src/view/classCategory/autocomplete/ClassCategoryAutocompleteFormItem';
import PoolAutocompleteFormItem from 'src/view/pool/autocomplete/PoolAutocompleteFormItem';

const schema = yup.object().shape({
  name: yupFilterSchemas.string(i18n('class.fields.name')),
  grade: yupFilterSchemas.relationToOne(
    i18n('class.fields.grade'),
  ),
});

const previewRenders = {
  name: {
    label: i18n('class.fields.name'),
    render: filterRenders.generic(),
  },
  category: {
    label: i18n('class.fields.category'),
    render: filterRenders.relationToOne(),
  },
  pool: {
    label: i18n('class.fields.pool'),
    render: filterRenders.relationToOne(),
  },
  duration: {
    label: i18n('class.fields.duration'),
    render: filterRenders.generic(),
  },
};

const emptyValues = {
  name: '',
  category: '',
  pool: '',
  duration: '',
};

function ClassListFilter(props) {
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

  const { loading } = props;

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
            <MDBox
              component="form"
              role="form"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <Grid container spacing={1.6}>
                <Grid item lg={6} md={8} xs={12}>
                  <InputFormItem
                    name={'name'}
                    label={i18n('class.fields.name')}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} md={8} xs={12}>
                  <ClassCategoryAutocompleteFormItem
                    name={'category'}
                    label={i18n('class.fields.category')}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} md={8} xs={12}>
                  <PoolAutocompleteFormItem
                    name={'pool'}
                    label={i18n('class.fields.pool')}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} md={8} xs={12}>
                  <InputFormItem
                    name={'duration'}
                    label={i18n('class.fields.duration')}
                    variant="standard"
                  />
                </Grid>
              </Grid>
              <FilterButtons>
                <MDButton
                  size="small"
                  variant="gradient"
                  color={sidenavColor}
                  type="submit"
                  disabled={loading}
                  startIcon={<SearchIcon />}
                >
                  {i18n('common.search')}
                </MDButton>

                <MDButton
                  size="small"
                  variant="outlined"
                  color={sidenavColor}
                  type="button"
                  onClick={onReset}
                  disabled={loading}
                  startIcon={<UndoIcon />}
                >
                  {i18n('common.reset')}
                </MDButton>
              </FilterButtons>
            </MDBox>
          </FormProvider>
        </AccordionDetails>
      </FilterAccordion>
    </FilterWrapper>
  );
}

export default ClassListFilter;
