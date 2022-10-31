import { FormProvider, useForm } from 'react-hook-form';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { TextField, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import actions from 'src/modules/user/form/userFormActions';
import CloseIcon from '@mui/icons-material/Close';
import formActions from 'src/modules/form/formActions';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import MDButton from 'src/mui/components/MDButton';
import SaveIcon from '@mui/icons-material/Save';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import UndoIcon from '@mui/icons-material/Undo';
import userEnumerators from 'src/modules/user/userEnumerators';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

const schema = yup.object().shape({
  roles: yupFormSchemas.stringArray(
    i18n('teacher.fields.roles'),
  ),
});

function TeacherEditForm(props) {
  const dispatch = useDispatch();

  const { sidenavColor } = selectMuiSettings();

  const [initialValues] = useState(() => props.user || {});

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {
    const data = {
      id: props.user.id,
      ...values,
    };
    delete data.email;
    dispatch(actions.doUpdate(data));
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
    dispatch(formActions.doRefresh());
  };

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Grid spacing={1.6} container>
            <Grid item lg={7} md={8} sm={12} xs={12}>
              <TextField
                id="email"
                name="email"
                label={i18n('teacher.fields.email')}
                value={props.user.email}
                fullWidth
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
                size="small"
              />
            </Grid>
            <Grid item lg={7} md={8} sm={12} xs={12}>
              <SelectFormItem
                name="roles"
                label={i18n('teacher.fields.roles')}
                options={userEnumerators.roles.map(
                  (value) => ({
                    value,
                    label: i18n(`roles.${value}.label`),
                  }),
                )}
                mode="multiple"
                variant="standard"
              />
            </Grid>
          </Grid>

          <FormButtons>
            <MDButton
              variant="gradient"
              color={sidenavColor}
              disabled={props.saveLoading}
              type="button"
              onClick={form.handleSubmit(onSubmit)}
              startIcon={<SaveIcon />}
              size="small"
            >
              {i18n('common.save')}
            </MDButton>

            <MDButton
              disabled={props.saveLoading}
              color={sidenavColor}
              variant="outlined"
              onClick={onReset}
              type="button"
              startIcon={<UndoIcon />}
              size="small"
            >
              {i18n('common.reset')}
            </MDButton>

            {props.onCancel ? (
              <MDButton
                color={sidenavColor}
                variant="outlined"
                disabled={props.saveLoading}
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

export default TeacherEditForm;
