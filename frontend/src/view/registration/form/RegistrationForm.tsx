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
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import ClassAutocompleteFormItem from 'src/view/class/autocomplete/ClassAutocompleteFormItem';
import LessonAutocompleteFormItem from 'src/view/lesson/autocomplete/LessonAutocompleteFormItem';
import ImagesFormItem from 'src/view/shared/form/items/ImagesFormItem';
import Storage from 'src/security/storage';

const schema = yup.object().shape({
  class: yupFormSchemas.relationToOne(
    i18n('registration.fields.class'),
    {
      required: true,
    },
  ),
  lessons: yupFormSchemas.relationToMany(
    i18n('registration.fields.lesson'),
    {
      required: true,
    },
  ),
});

function RegistrationForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const [classId, setClassId] = useState(null);
  const dispatch = useDispatch();
  const [initialValues] = useState(() => {
    const student = props.student || {};

    return {
      class: student.class,
      lessons: student.lessons,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues as any,
  });

  const onSubmit = (values) => {
    props.onSubmit(props.student?.id, values);
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
    dispatch(formActions.doRefresh());
  };

  const onChange = (value) => {
    setClassId(value);
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
                label={i18n('registration.fields.class')}
                required={true}
                variant="standard"
                onChange={onChange}
                fullWidth
                autoFocus
              />
            </Grid>
            <Grid item lg={6} md={8} sm={12} xs={12}>
              <LessonAutocompleteFormItem
                name="lessons"
                label={i18n('registration.fields.lesson')}
                classId={classId}
                required={true}
                showCreate={true}
                variant="standard"
                mode="multiple"
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

export default RegistrationForm;
