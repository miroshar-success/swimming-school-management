import { BrandLogo } from 'src/assets/resources';
import { Card } from '@mui/material';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from 'src/modules/auth/authActions';
import CoverLayout from 'src/mui/shared/Layouts/CoverLayout';
import GradientTitle from 'src/view/shared/components/GradientTitle';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import queryString from 'query-string';
import selectors from 'src/modules/auth/authSelectors';

function VerifyEmailPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  const token = queryString.parse(location.search).token;

  const signedIn = useSelector(selectors.selectSignedIn);
  const errorMessage = useSelector(
    selectors.selectErrorMessageVerifyEmail,
  );
  const loading = useSelector(
    selectors.selectLoadingVerifyEmail,
  );

  const backgroundImageUrl = useSelector(
    selectors.selectBackgroundImageUrl,
  );

  useEffect(() => {
    dispatch(actions.doVerifyEmail(token));
  }, [dispatch, token]);

  const doSignout = async () => {
    await dispatch(actions.doSignout());
    getHistory().push('/');
  };

  return (
    <CoverLayout
      image={
        backgroundImageUrl || '/images/emailUnverified.jpg'
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
          {loading && (
            <MDTypography variant="h6" align="center">
              {i18n('auth.verifyEmail.message')}
            </MDTypography>
          )}
          {!loading && !errorMessage && (
            <MDTypography
              variant="h6"
              align="center"
              color="success"
            >
              {i18n('auth.verifyEmail.success')}
            </MDTypography>
          )}
          {!loading && errorMessage && (
            <MDTypography variant="h6" align="center">
              {errorMessage}
            </MDTypography>
          )}
          <MDBox
            mt={2.4}
            display="flex"
            justifyContent="center"
          >
            {!loading && errorMessage && (
              <MDButton
                variant="gradient"
                color="info"
                type="button"
                fullWidth
                onClick={doSignout}
              >
                {i18n('auth.signout')}
              </MDButton>
            )}
            {!loading && !errorMessage && !signedIn && (
              <MDButton
                component={Link}
                to="/auth/signin"
                variant="gradient"
                color="info"
                type="button"
                fullWidth
              >
                {i18n('auth.signin')}
              </MDButton>
            )}
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default VerifyEmailPage;
