import { i18n } from 'src/i18n';
import { tenantSubdomain } from 'src/modules/tenant/tenantSubdomain';
import { urlfy } from '../shared/urlfy';
import { useForm, FormProvider } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import actions from 'src/modules/tenant/form/tenantFormActions';
import authSelectors from 'src/modules/auth/authSelectors';
import config from 'src/config';
import InputAdornment from '@mui/material/InputAdornment';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import selectors from 'src/modules/tenant/form/tenantFormSelectors';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import formActions from 'src/modules/form/formActions';

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

function TenantNewForm(props) {
  const dispatch = useDispatch();

  const [initialValues] = useState({
    name: '',
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const loading = useSelector(selectors.selectSaveLoading);

  const invitedTenants = useSelector(
    authSelectors.selectInvitedTenants,
  );

  const onSubmit = (values) => {
    dispatch(actions.doCreate(values));
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <MDBox mb={1.6}>
          <InputFormItem
            name="name"
            label={i18n('tenant.fields.tenantName')}
            autoComplete="name"
            onChange={(value) => {
              // @ts-ignore
              form.setValue('url', urlfy(value));
              dispatch(formActions.doRefresh());
            }}
            autoFocus
          />
        </MDBox>

        {tenantSubdomain.isEnabled && (
          <MDBox mb={1.6}>
            <InputFormItem
              name="url"
              label={i18n('tenant.fields.tenantUrl')}
              endAdornment={
                <InputAdornment position="end">
                  .{config.frontendUrl.host}
                </InputAdornment>
              }
            />
          </MDBox>
        )}

        <MDButton
          variant="gradient"
          color="info"
          type="submit"
          fullWidth
          disabled={loading}
        >
          {i18n('tenant.create.button')}
        </MDButton>
        {Boolean(invitedTenants.length) && (
          <MDBox mt={1.6}>
            <MDButton
              type="button"
              fullWidth
              onClick={props.onViewToggle}
            >
              {i18n('tenant.invitation.view')}
            </MDButton>
          </MDBox>
        )}
      </form>
    </FormProvider>
  );
}

export default TenantNewForm;
