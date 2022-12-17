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
import actions from 'src/modules/lesson/list/lessonListActions';
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
import selectors from 'src/modules/lesson/list/lessonListSelectors';
import UndoIcon from '@mui/icons-material/Undo';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';
import GradeAutocompleteFormItem from 'src/view/grade/autocomplete/GradeAutocompleteFormItem';
import ClassAutocompleteFormItem from 'src/view/class/autocomplete/ClassAutocompleteFormItem';
import TeacherAutocompleteFormItem from 'src/view/teacher/autocomplete/TeacherAutocompleteFormItem';
import lessonEnumerators from 'src/modules/lesson/lessonEnumerators';

function LessonListFilter(props) {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.doFetch());
    // eslint-disable-next-line
  }, [dispatch]);

  const onSubmit = (values) => {
    dispatch(actions.doFetch());
    dispatch(formActions.doRefresh());
  };

  return (
    <MDBox>
      <Grid container spacing={1.6}>
        <Grid item lg={6} md={8} xs={12}>
          <ClassAutocompleteFormItem
            name={'class'}
            label={i18n('lesson.fields.class')}
            variant="standard"
          />
        </Grid>
        <Grid item lg={6} md={8} xs={12}>
          <SelectFormItem
            name={'day'}
            label={i18n('lesson.fields.day')}
            options={lessonEnumerators.day.map(
              (value, index) => ({
                value: index,
                label: value,
              }),
            )}
            mode="single"
            variant="standard"
          />
        </Grid>
        <Grid item lg={6} md={8} xs={12}>
          <InputFormItem
            name={'time'}
            label={i18n('lesson.fields.time')}
            variant="standard"
          />
        </Grid>
        <Grid item lg={6} md={8} xs={12}>
          <TeacherAutocompleteFormItem
            name={'teacher'}
            label={i18n('lesson.fields.teacher')}
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
          startIcon={<SearchIcon />}
        >
          {i18n('common.search')}
        </MDButton>

        <MDButton
          size="small"
          variant="outlined"
          color={sidenavColor}
          type="button"
          startIcon={<UndoIcon />}
        >
          {i18n('common.reset')}
        </MDButton>
      </FilterButtons>
    </MDBox>
  );
}

export default LessonListFilter;
