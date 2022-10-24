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
import actions from 'src/modules/task/list/taskListActions';
import ColorBadgeSelectFormItem, {
  generateColorBadgeSelectOptions,
} from 'src/view/shared/form/items/ColorBadgeSelectFormItem';
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
import SearchIcon from '@mui/icons-material/Search';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import selectors from 'src/modules/task/list/taskListSelectors';
import TagAutocompleteFormItem from 'src/view/tag/autocomplete/TagAutocompleteFormItem';
import taskEnumerators from 'src/modules/task/taskEnumerators';
import TaskPriorityAutocompleteFormItem from 'src/view/taskPriority/autocomplete/TaskPriorityAutocompleteFormItem';
import UndoIcon from '@mui/icons-material/Undo';
import UserAutocompleteFormItem from 'src/view/user/autocomplete/UserAutocompleteFormItem';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';

const schema = yup.object().shape({
  referenceRange: yupFilterSchemas.integerRange(
    i18n('entities.task.fields.referenceRange'),
  ),
  title: yupFilterSchemas.string(
    i18n('entities.task.fields.title'),
  ),
  priority: yupFilterSchemas.relationToOne(
    i18n('entities.task.fields.priority'),
  ),
  repeat: yupFilterSchemas.enumerator(
    i18n('entities.task.fields.repeat'),
  ),
  status: yupFilterSchemas.enumerator(
    i18n('entities.task.fields.status'),
  ),
  owner: yupFilterSchemas.relationToOne(
    i18n('entities.task.fields.owner'),
  ),
  approver: yupFilterSchemas.relationToOne(
    i18n('entities.task.fields.approver'),
  ),
  dueDateRange: yupFilterSchemas.datetimeRange(
    i18n('entities.task.fields.dueDateRange'),
  ),
  completedDateRange: yupFilterSchemas.datetimeRange(
    i18n('entities.task.fields.completedDateRange'),
  ),
  tags: yupFilterSchemas.relationToMany(
    i18n('entities.task.fields.tags'),
  ),
  openTasksOnly: yupFilterSchemas.boolean(
    i18n('entities.task.fields.openTasksOnly'),
  ),
});

const emptyValues = {
  referenceRange: [],
  title: '',
  priority: '',
  repeat: '',
  status: '',
  owner: '',
  approver: '',
  dueDateRange: [],
  completedDateRange: [],
  tags: [],
  openTasksOnly: null,
};

const previewRenders = {
  referenceRange: {
    label: i18n('entities.task.fields.referenceRange'),
    render: filterRenders.range(),
  },
  title: {
    label: i18n('entities.task.fields.title'),
    render: filterRenders.generic(),
  },
  priority: {
    label: i18n('entities.task.fields.priority'),
    render: filterRenders.relationToOne(),
  },
  repeat: {
    label: i18n('entities.task.fields.repeat'),
    render: filterRenders.enumerator(
      'entities.task.enumerators.repeat',
    ),
  },
  status: {
    label: i18n('entities.task.fields.status'),
    render: filterRenders.enumerator(
      'entities.task.enumerators.status',
    ),
  },
  owner: {
    label: i18n('entities.task.fields.owner'),
    render: filterRenders.relationToOne(),
  },
  approver: {
    label: i18n('entities.task.fields.approver'),
    render: filterRenders.relationToOne(),
  },
  dueDateRange: {
    label: i18n('entities.task.fields.dueDateRange'),
    render: filterRenders.datetimeRange(),
  },
  completedDateRange: {
    label: i18n('entities.task.fields.completedDateRange'),
    render: filterRenders.datetimeRange(),
  },
  tags: {
    label: i18n('entities.task.fields.tags'),
    render: filterRenders.relationToMany('tag'),
  },
  openTasksOnly: {
    label: i18n('entities.task.fields.openTasksOnly'),
    render: filterRenders.enumerator('common.boolean'),
  },
};

function TaskListFilter(props) {
  const { sidenavColor } = selectMuiSettings();
  const { loading, additionalFilters } = props;
  const rawFilter = useSelector(selectors.selectRawFilter);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const [initialValues] = useState(() => {
    return {
      ...emptyValues,
      ...rawFilter,
      ...additionalFilters,
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
    dispatch(
      actions.doFetch(
        { ...values, ...additionalFilters },
        rawValues,
        false,
      ),
    );
    setExpanded(false);
    dispatch(formActions.doRefresh());
  };

  const onReset = () => {
    Object.keys(emptyValues).forEach((key) => {
      form.setValue(key, emptyValues[key]);
    });
    dispatch(actions.doReset(additionalFilters));
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
                  <InputNumberRangeFormItem
                    name="referenceRange"
                    label={i18n(
                      'entities.task.fields.referenceRange',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <InputFormItem
                    name="title"
                    label={i18n(
                      'entities.task.fields.title',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <TaskPriorityAutocompleteFormItem
                    name="priority"
                    label={i18n(
                      'entities.task.fields.priority',
                    )}
                    variant="standard"
                    fullWidth
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <SelectFormItem
                    name="repeat"
                    label={i18n(
                      'entities.task.fields.repeat',
                    )}
                    options={taskEnumerators.repeat.map(
                      (value) => ({
                        value,
                        label: i18n(
                          `entities.task.enumerators.repeat.${value}`,
                        ),
                      }),
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <ColorBadgeSelectFormItem
                    name="status"
                    label={i18n(
                      'entities.task.fields.status',
                    )}
                    options={generateColorBadgeSelectOptions(
                      taskEnumerators.status,
                      taskEnumerators.statusColor,
                      'entities.task.enumerators.status',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <UserAutocompleteFormItem
                    name="owner"
                    label={i18n(
                      'entities.task.fields.owner',
                    )}
                    variant="standard"
                    fullWidth
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <UserAutocompleteFormItem
                    name="approver"
                    label={i18n(
                      'entities.task.fields.approver',
                    )}
                    variant="standard"
                    fullWidth
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <DatePickerRangeFormItem
                    name="dueDateRange"
                    label={i18n(
                      'entities.task.fields.dueDateRange',
                    )}
                    variant="standard"
                    showTime
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <DatePickerRangeFormItem
                    name="completedDateRange"
                    label={i18n(
                      'entities.task.fields.completedDateRange',
                    )}
                    variant="standard"
                    showTime
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <TagAutocompleteFormItem
                    name="tags"
                    label={i18n(
                      'entities.task.fields.tags',
                    )}
                  />
                </Grid>
              </Grid>

              <FilterButtons>
                <MDButton
                  variant="gradient"
                  color={sidenavColor}
                  type="submit"
                  disabled={loading}
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
                  disabled={loading}
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

TaskListFilter.defaultProps = {
  additionalFilters: { ids: [], contains: false },
};

export default TaskListFilter;
