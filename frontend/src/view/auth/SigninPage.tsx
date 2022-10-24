import { BrandLogo } from 'src/assets/resources';
import { FormControlLabel } from '@mui/material';
import { i18n } from 'src/i18n';
import { Link, useLocation } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import actions from 'src/modules/auth/authActions';
import BasicLayout from 'src/mui/shared/Layouts/BasicLayout';
import bgImage from 'src/mui/assets/images/bg-sign-in-basic.jpeg';
import Card from '@mui/material/Card';
import GradientTitle from 'src/view/shared/components/GradientTitle';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import Message from 'src/view/shared/message';
import queryString from 'query-string';
import selectors from 'src/modules/auth/authSelectors';
import Switch from '@mui/material/Switch';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

const schema = yup.object().shape({
  email: yupFormSchemas.string(i18n('user.fields.email'), {
    required: true,
  }),
  password: yupFormSchemas.string(
    i18n('user.fields.password'),
    {
      required: true,
    },
  ),
  rememberMe: yupFormSchemas.boolean(
    i18n('user.fields.rememberMe'),
  ),
});

function SigninPage(): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();

  const { sidenavColor } = selectMuiSettings();

  const { socialErrorCode } = queryString.parse(
    location.search,
  );
  const backgroundImageUrl = useSelector(
    selectors.selectBackgroundImageUrl,
  );

  const loading = useSelector(selectors.selectLoading);

  const externalErrorMessage = useSelector(
    selectors.selectErrorMessage,
  );

  useEffect(() => {
    dispatch(actions.doClearErrorMessage());
  }, [dispatch]);

  useEffect(() => {
    if (socialErrorCode) {
      if (socialErrorCode === 'generic') {
        Message.error(i18n('errors.defaultErrorMessage'));
      } else {
        Message.error(
          i18n(`auth.social.errors.${socialErrorCode}`),
        );
      }
    }
  }, []);

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
  });

  const onSubmit = (values) => {
    dispatch(
      actions.doSigninWithEmailAndPassword(
        values.email,
        values.password,
        values.rememberMe,
      ),
    );
  };

  return (
    <BasicLayout
      image={
        backgroundImageUrl ? backgroundImageUrl : bgImage
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
            <MDBox
              component="form"
              role="form"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <MDBox mb={1.6}>
                <InputFormItem
                  name="email"
                  label={i18n('user.fields.email')}
                  autoComplete="email"
                  externalErrorMessage={
                    externalErrorMessage
                  }
                  autoFocus
                />
              </MDBox>
              <MDBox mb={1.6}>
                <InputFormItem
                  name="password"
                  label={i18n('user.fields.password')}
                  autoComplete="password"
                  type="password"
                />
              </MDBox>
              <MDBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <FormControlLabel
                  control={
                    <Switch
                      id={'rememberMe'}
                      name={'rememberMe'}
                      defaultChecked={true}
                      inputRef={form.register}
                      color={sidenavColor}
                    />
                  }
                  label={i18n('user.fields.rememberMe')}
                />
                <MDTypography variant="button" color="text">
                  <MDTypography
                    component={Link}
                    variant="button"
                    color="info"
                    to="/auth/forgot-password"
                    fontWeight="medium"
                    textGradient
                  >
                    {i18n('auth.forgotPassword')}
                  </MDTypography>
                </MDTypography>
              </MDBox>
              <MDBox mt={2.4} mb={0.8}>
                <MDButton
                  type="submit"
                  variant="gradient"
                  color="info"
                  fullWidth
                  disabled={loading}
                >
                  {i18n('auth.signin')}
                </MDButton>
              </MDBox>
              <MDBox mt={2.4} textAlign="center">
                <MDTypography variant="button" color="text">
                  <MDTypography
                    component={Link}
                    to="/auth/signup"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    {i18n('auth.createAnAccount')}
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </MDBox>
          </FormProvider>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default SigninPage;
