import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import formActions from 'src/modules/form/formActions';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import MDButton from 'src/mui/components/MDButton';
import SaveIcon from '@mui/icons-material/Save';
import TeacherFormLayout from 'src/view/teacher/form/TeacherFormLayout';
import UndoIcon from '@mui/icons-material/Undo';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

const schema = yup.object().shape({
  firstName: yupFormSchemas.string(
    i18n('user.fields.firstName'),
    {
      required: true,
      max: 80,
    },
  ),
  lastName: yupFormSchemas.string(
    i18n('user.fields.lastName'),
    {
      required: true,
      max: 175,
    },
  ),
  phoneNumber: yupFormSchemas.string(
    i18n('user.fields.phoneNumber'),
    {
      required: true,
      matches: /^[0-9]/,
      max: 24,
    },
  ),
  RFC: yupFormSchemas.string(i18n('user.fields.RFC'), {
    required: true,
    max: 50,
  }),
  CURP: yupFormSchemas.string(i18n('user.fields.CURP'), {
    required: true,
    max: 50,
  }),
  birthday: yupFormSchemas.date(
    i18n('user.fields.birthday'),
    {
      required: true,
    },
  ),
  comment: yupFormSchemas.string(
    i18n('user.fields.comment'),
  ),
  avatars: yupFormSchemas.images(
    i18n('user.fields.avatars'),
    {
      required: true,
      max: 1,
    },
  ),
  email: yupFormSchemas.email(i18n('user.fields.email'), {
    required: true,
  }),
  password: yupFormSchemas.string(
    i18n('user.fields.email'),
    {
      required: true,
    },
  ),
});

function TeacherForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  console.log(props.teacher);

  const [initialValues] = useState(() => {
    const teacher = props.teacher || {};

    return {
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      phoneNumber: teacher.phoneNumber,
      RFC: teacher.RFC,
      CURP: teacher.CURP,
      birthday: teacher.birthday,
      comment: teacher.comment,
      avatars: teacher.avatars || [],
      email: teacher.email,
      password: teacher.password,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {
    const { ...data } = values;

    props.onSubmit(props.teacher?.id, {
      ...data,
      emails: [data.email],
      roles: ['teacher'],
    });
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
    dispatch(formActions.doRefresh());
  };

  const { saveLoading, modal, title } = props;

  const makeFormButtons = (modal = false) => {
    return (
      <FormButtons
        style={{
          flexDirection: modal ? 'row-reverse' : undefined,
        }}
      >
        <MDButton
          variant="gradient"
          color={sidenavColor}
          disabled={saveLoading}
          type="submit"
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
    );
  };

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <MDTypography variant="h4">
              {title}
            </MDTypography>
            {makeFormButtons(modal)}
          </MDBox>
          <TeacherFormLayout />
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default TeacherForm;
