import { Button, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import React, { useState } from 'react';
import { i18n } from 'src/i18n';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDButton from 'src/mui/components/MDButton';
import { useDispatch } from 'react-redux';
import formActions from 'src/modules/form/formActions';
import ClassAutocompleteFormItem from 'src/view/class/autocomplete/ClassAutocompleteFormItem';
import TeacherAutocompleteFormItem from 'src/view/teacher/autocomplete/TeacherAutocompleteFormItem';
import ImagesFormItem from 'src/view/shared/form/items/ImagesFormItem';
import Storage from 'src/security/storage';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import TimePickerFormItem from 'src/view/shared/form/items/TimePickerFormItem';

const schema = yup.object().shape({
  class: yupFormSchemas.relationToOne(
    i18n('lesson.fields.class'),
    {
      required: true,
    },
  ),
  day: yupFormSchemas.string(i18n('lesson.fields.day'), {
    required: true,
  }),
  time: yupFormSchemas.datetime(
    i18n('lesson.fields.time'),
    {
      required: true,
    },
  ),
  teacher: yupFormSchemas.relationToOne(
    i18n('lesson.fields.teacher'),
    {
      required: true,
    },
  ),
});

function LessonForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      class: record.class,
      day: record.day,
      time: record.time,
      teacher: record.teacher,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues as any,
  });

  const onSubmit = (values) => {
    console.log(values);
    props.onSubmit(props.record?.id, values);
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
    dispatch(formActions.doRefresh());
  };

  const { saveLoading, modal } = props;

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Grid spacing={1.6} container>
            <Grid item lg={6} md={8} sm={12} xs={12}>
              <ClassAutocompleteFormItem
                name="class"
                label={i18n('lesson.fields.class')}
                required={true}
                showCreate={true}
                variant="standard"
                fullWidth
                autoFocus
              />
            </Grid>
            <Grid item lg={6} md={8} sm={12} xs={12}>
              <InputFormItem
                name="day"
                label={i18n('lesson.fields.day')}
                required={true}
                variant="standard"
                fullWidth
                autoFocus
              />
            </Grid>
            <Grid item lg={6} md={8} sm={12} xs={12}>
              <TimePickerFormItem
                name="time"
                label={i18n('lesson.fields.time')}
                required={true}
                variant="standard"
              />
            </Grid>
            <Grid item lg={6} md={8} sm={12} xs={12}>
              <TeacherAutocompleteFormItem
                name="teacher"
                label={i18n('lesson.fields.teacher')}
                required={true}
                variant="standard"
                fullWidth
                autoFocus
              />
            </Grid>
          </Grid>
          <FormButtons
            style={{
              flexDirection: modal
                ? 'row-reverse'
                : undefined,
            }}
          >
            <MDButton
              variant="gradient"
              color={sidenavColor}
              disabled={saveLoading}
              type="button"
              onClick={form.handleSubmit(onSubmit)}
              startIcon={<SaveIcon />}
              size="small"
            >
              {i18n('common.save')}
            </MDButton>

            <MDButton
              variant="outlined"
              color={sidenavColor}
              disabled={saveLoading}
              onClick={onReset}
              type="button"
              startIcon={<UndoIcon />}
              size="small"
            >
              {i18n('common.reset')}
            </MDButton>

            {props.onCancel ? (
              <MDButton
                variant="outlined"
                color={sidenavColor}
                disabled={saveLoading}
                onClick={() => props.onCancel()}
                type="button"
                startIcon={<CloseIcon />}
                size="small"
              >
                {i18n('common.cancel')}
              </MDButton>
            ) : null}
          </FormButtons>
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default LessonForm;
