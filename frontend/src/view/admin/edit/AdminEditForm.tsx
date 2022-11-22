import { FormProvider, useForm } from 'react-hook-form';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { TextField, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import actions from 'src/modules/admin/form/adminFormActions';
import CloseIcon from '@mui/icons-material/Close';
import formActions from 'src/modules/form/formActions';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import MDButton from 'src/mui/components/MDButton';
import SaveIcon from '@mui/icons-material/Save';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import UndoIcon from '@mui/icons-material/Undo';
import adminEnumerators from 'src/modules/admin/adminEnumerators';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

const schema = yup.object().shape({
  roles: yupFormSchemas.stringArray(
    i18n('admin.fields.roles'),
  ),
});

function AdminEditForm(props) {
  const dispatch = useDispatch();

  const { sidenavColor } = selectMuiSettings();

  const [initialValues] = useState(() => props.admin || {});

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {
    const data = {
      id: props.admin.id,
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
                label={i18n('admin.fields.email')}
                value={props.admin.email}
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
                label={i18n('admin.fields.roles')}
                options={adminEnumerators.roles.map(
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

export default AdminEditForm;
