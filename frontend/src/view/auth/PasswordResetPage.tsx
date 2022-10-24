import { BrandLogo } from 'src/assets/resources';
import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import { Link, useLocation } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import actions from 'src/modules/auth/authActions';
import CoverLayout from 'src/mui/shared/Layouts/CoverLayout';
import GradientTitle from 'src/view/shared/components/GradientTitle';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import queryString from 'query-string';
import selectors from 'src/modules/auth/authSelectors';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

const schema = yup.object().shape({
  password: yupFormSchemas.string(
    i18n('user.fields.password'),
    {
      required: true,
    },
  ),
});

function PasswordResetPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  const backgroundImageUrl = useSelector(
    selectors.selectBackgroundImageUrl,
  );

  const token = queryString.parse(location.search).token;

  const [initialValues] = useState({
    password: '',
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const loading = useSelector(
    selectors.selectLoadingPasswordReset,
  );

  const onSubmit = async ({ password }) => {
    dispatch(actions.doResetPassword(token, password));
  };

  return (
    <CoverLayout
      image={
        backgroundImageUrl || '/images/forgotPassword.jpg'
      }
    >
      <Card>
        <GradientTitle>
          <MDBox
            display="flex"
            justifyContent="center"
            py={1.6}
          >
            <BrandLogo width="80%" />
          </MDBox>
        </GradientTitle>
        <MDBox pt={3.2} pb={2.4} px={2.4}>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <InputFormItem
                name="password"
                label={i18n('user.fields.password')}
                autoComplete="password"
                type="password"
                autoFocus
              />

              <MDBox mt={3.2}>
                <MDButton
                  variant="gradient"
                  color="info"
                  type="submit"
                  fullWidth
                  disabled={loading}
                >
                  {i18n('auth.passwordReset.message')}
                </MDButton>
              </MDBox>

              <MDBox my={2.4} textAlign="center">
                <MDTypography
                  variant="button"
                  color="info"
                  component={Link}
                  to="/auth/signin"
                  fontWeight="medium"
                  textGradient
                >
                  {i18n('common.cancel')}
                </MDTypography>
              </MDBox>
            </form>
          </FormProvider>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default PasswordResetPage;
