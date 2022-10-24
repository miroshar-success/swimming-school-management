import { BrandLogo } from 'src/assets/resources';
import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from 'src/modules/auth/authActions';
import bgImage from 'src/mui/assets/images/bg-sign-up-cover.jpeg';
import Card from '@mui/material/Card';
import CoverLayout from 'src/mui/shared/Layouts/CoverLayout';
import GradientTitle from 'src/view/shared/components/GradientTitle';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import selectors from 'src/modules/auth/authSelectors';
import TenantNewForm from 'src/view/auth/TenantNewForm';
import TenantSelectForm from 'src/view/auth/TenantSelectForm';

function TenantPage(): JSX.Element {
  const [view, setView] = useState('form');
  const dispatch = useDispatch();

  const invitedTenants = useSelector(
    selectors.selectInvitedTenants,
  );

  const backgroundImageUrl = useSelector(
    selectors.selectBackgroundImageUrl,
  );
  const logoUrl = useSelector(selectors.selectLogoUrl);

  useEffect(() => {
    setView(invitedTenants.length ? 'select' : 'form');
  }, [invitedTenants]);

  const doSignout = () => {
    dispatch(actions.doSignout());
  };

  const doToggleView = () => {
    setView((prevView) =>
      prevView === 'form' ? 'select' : 'form',
    );
  };

  return (
    <CoverLayout image={bgImage}>
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
          {view === 'form' ? (
            <TenantNewForm onViewToggle={doToggleView} />
          ) : (
            <TenantSelectForm onViewToggle={doToggleView} />
          )}
          <MDBox mt={2.4} mb={0.8} textAlign="center">
            <MDTypography variant="button" color="text">
              <MDTypography
                component={Link}
                to="#"
                variant="button"
                color="info"
                fontWeight="medium"
                onClick={doSignout}
                textGradient
              >
                {i18n('auth.signout')}
              </MDTypography>
            </MDTypography>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default TenantPage;
