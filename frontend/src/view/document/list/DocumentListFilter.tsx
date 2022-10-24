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
import actions from 'src/modules/document/list/documentListActions';
import ColorBadgeSelectFormItem, {
  generateColorBadgeSelectOptions,
} from 'src/view/shared/form/items/ColorBadgeSelectFormItem';
import DatePickerRangeFormItem from 'src/view/shared/form/items/DatePickerRangeFormItem';
import documentEnumerators from 'src/modules/document/documentEnumerators';
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
import SearchIcon from '@mui/icons-material/Search';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import selectors from 'src/modules/document/list/documentListSelectors';
import TagAutocompleteFormItem from 'src/view/tag/autocomplete/TagAutocompleteFormItem';
import UndoIcon from '@mui/icons-material/Undo';
import UserAutocompleteFormItem from 'src/view/user/autocomplete/UserAutocompleteFormItem';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';

const schema = yup.object().shape({
  title: yupFilterSchemas.string(
    i18n('entities.document.title'),
  ),
  type: yupFilterSchemas.enumerator(
    i18n('entities.document.type'),
  ),
  typeTitle: yupFilterSchemas.string(
    i18n('entities.document.typeTitle'),
  ),
  tags: yupFilterSchemas.relationToMany(
    i18n('entities.document.tags'),
  ),
  name: yupFilterSchemas.string(
    i18n('entities.document.fields.name'),
  ),
  uploader: yupFilterSchemas.relationToOne(
    i18n('entities.document.uploader'),
  ),
  uploadedAtRange: yupFilterSchemas.datetimeRange(
    i18n('entities.document.uploadedAtRange'),
  ),
  sizeRange: yupFilterSchemas.integerRange(
    i18n('entities.document.sizeRange'),
  ),
  extension: yupFilterSchemas.enumerator(
    i18n('entities.document.extension'),
  ),
});

const emptyValues = {
  title: '',
  type: '',
  typeTitle: '',
  tags: [],
  name: '',
  uploader: '',
  uploadedAtRange: [],
  sizeRange: [],
  extension: '',
};

const previewRenders = {
  title: {
    label: i18n('entities.document.fields.title'),
    render: filterRenders.generic(),
  },
  type: {
    label: i18n('entities.document.fields.type'),
    render: filterRenders.enumerator(
      'entities.document.enumerators.type',
    ),
  },
  typeTitle: {
    label: i18n('entities.document.fields.typeTitle'),
    render: filterRenders.generic(),
  },
  tags: {
    label: i18n('entities.document.fields.tags'),
    render: filterRenders.relationToMany('tag'),
  },
  name: {
    label: i18n('entities.document.fields.fields.name'),
    render: filterRenders.generic(),
  },
  uploader: {
    label: i18n('entities.document.fields.uploader'),
    render: filterRenders.relationToOne(),
  },
  uploadedAtRange: {
    label: i18n('entities.document.fields.uploadedAtRange'),
    render: filterRenders.datetimeRange(),
  },
  sizeRange: {
    label: i18n('entities.document.fields.sizeRange'),
    render: filterRenders.range(),
  },
  extension: {
    label: i18n('entities.document.fields.extension'),
    render: filterRenders.enumerator(
      'entities.document.enumerators.extension',
    ),
  },
};

function DocumentListFilter(props) {
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
                      'entities.document.fields.title',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <InputFormItem
                    name="name"
                    label={i18n(
                      'entities.document.fields.name',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <ColorBadgeSelectFormItem
                    name="type"
                    label={i18n(
                      'entities.document.fields.type',
                    )}
                    options={generateColorBadgeSelectOptions(
                      documentEnumerators.type,
                      documentEnumerators.typeColor,
                      'entities.document.enumerators.type',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <InputFormItem
                    name="typeTitle"
                    label={i18n(
                      'entities.document.fields.typeTitle',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TagAutocompleteFormItem
                    name="tags"
                    label={i18n(
                      'entities.document.fields.tags',
                    )}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <UserAutocompleteFormItem
                    name="uploader"
                    label={i18n(
                      'entities.document.fields.uploader',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <DatePickerRangeFormItem
                    name="uploadedAt"
                    label={i18n(
                      'entities.document.fields.uploadedAt',
                    )}
                    variant="standard"
                    showTime
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <InputNumberRangeFormItem
                    name="size"
                    label={i18n(
                      'entities.document.fields.size',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <SelectFormItem
                    name="extension"
                    label={i18n(
                      'entities.document.fields.extension',
                    )}
                    options={documentEnumerators.extension.map(
                      (value) => ({
                        value,
                        label: i18n(
                          `entities.document.enumerators.extension.${value}`,
                        ),
                      }),
                    )}
                    variant="standard"
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

export default DocumentListFilter;
