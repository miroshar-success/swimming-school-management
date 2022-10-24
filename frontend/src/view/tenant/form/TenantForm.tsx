import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { tenantSubdomain } from 'src/modules/tenant/tenantSubdomain';
import { useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import config from 'src/config';
import formActions from 'src/modules/form/formActions';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import InputAdornment from '@mui/material/InputAdornment';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDButton from 'src/mui/components/MDButton';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

const schemaWithUrl = yup.object().shape({
  name: yupFormSchemas.string(
    i18n('tenant.fields.tenantName'),
    {
      required: true,
      max: 50,
    },
  ),
  url: yupFormSchemas
    .string(i18n('tenant.fields.tenantUrl'), {
      required: true,
      max: 50,
    })
    .matches(
      /^[a-z0-9][-a-zA-Z0-9]*$/,
      i18n('tenant.validation.url'),
    ),
});

const schemaWithoutUrl = yup.object().shape({
  name: yupFormSchemas.string(
    i18n('tenant.fields.tenantName'),
    {
      required: true,
      max: 50,
    },
  ),
});

const schema = tenantSubdomain.isEnabled
  ? schemaWithUrl
  : schemaWithoutUrl;

function TenantForm(props) {
  const { sidenavColor, darkMode } = selectMuiSettings();
  const dispatch = useDispatch();

  const [initialValues] = useState(() => ({
    name: props.record?.name,
    url: props.record?.url,
  }));

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {
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
            <Grid item lg={7} md={8} sm={12} xs={12}>
              <InputFormItem
                name="name"
                label={i18n('tenant.fields.name')}
                required={true}
                variant="standard"
                autoFocus
              />
            </Grid>
            {tenantSubdomain.isEnabled && (
              <Grid item lg={7} md={8} sm={12} xs={12}>
                <InputFormItem
                  name="url"
                  label={i18n('tenant.fields.tenantUrl')}
                  required={true}
                  variant="standard"
                  endAdornment={
                    <InputAdornment
                      position="end"
                      sx={{
                        color:
                          (darkMode ? 'white' : 'inherit') +
                          ' !important',
                        pr: 5,
                      }}
                    >
                      .{config.frontendUrl.host}
                    </InputAdornment>
                  }
                />
              </Grid>
            )}
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

export default TenantForm;
