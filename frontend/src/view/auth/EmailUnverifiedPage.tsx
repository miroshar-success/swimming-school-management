import { BrandLogo } from 'src/assets/resources';
import { Card } from '@mui/material';
import { i18n, i18nHtml } from 'src/i18n';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'src/modules/auth/authActions';
import CoverLayout from 'src/mui/shared/Layouts/CoverLayout';
import GradientTitle from 'src/view/shared/components/GradientTitle';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import selectors from 'src/modules/auth/authSelectors';

function EmailUnverifiedPage() {
  const dispatch = useDispatch();

  const email = useSelector(
    selectors.selectCurrentUserEmail,
  );
  const loading = useSelector(
    selectors.selectLoadingEmailConfirmation,
  );
  const backgroundImageUrl = useSelector(
    selectors.selectBackgroundImageUrl,
  );

  const doSignout = () => {
    dispatch(actions.doSignout());
  };

  const doSubmit = () => {
    dispatch(actions.doSendEmailConfirmation());
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
          <MDTypography variant="h6" align="center">
            {i18nHtml(
              'auth.emailUnverified.message',
              email,
            )}
          </MDTypography>

          <MDBox mt={3.2}>
            <MDButton
              variant="gradient"
              color="info"
              type="submit"
              fullWidth
              disabled={loading}
              onClick={doSubmit}
            >
              {i18n('auth.emailUnverified.submit')}
            </MDButton>
          </MDBox>

          <MDBox my={2.4} textAlign="center">
            <MDTypography
              variant="button"
              color="info"
              component={Link}
              to="#"
              onClick={doSignout}
              fontWeight="medium"
              textGradient
            >
              {i18n('auth.signinWithAnotherAccount')}
            </MDTypography>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default EmailUnverifiedPage;
