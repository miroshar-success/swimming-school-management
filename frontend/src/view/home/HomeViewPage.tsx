import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';

import { Card, Container, Grid } from '@mui/material';
import { Theme } from '@mui/material/styles';

import PageLayout from 'src/mui/shared/Layouts/PageLayout';
import MDBox from 'src/mui/components/MDBox';

import SimpleNavbar from 'src/view/shared/Navbars/SimpleNavbar';
import MDTypography from 'src/mui/components/MDTypography';

export default function HomeViewPage(props) {
  return (
    <>
      <PageLayout>
        <SimpleNavbar
          routes={[
            {
              name: i18n('home.menu.schools'),
              route: '/schools',
            },
            {
              name: i18n('home.menu.registerSchool'),
              route: '/register-school',
            },
          ]}
          action={{
            type: 'internal',
            color: 'info',
            route: '/login',
            label: i18n('home.menu.login'),
          }}
        />
        <MDBox
          width="100%"
          minHeight="100vh"
          sx={{
            backgroundImage: ({
              functions: { linearGradient, rgba },
              palette: { gradients },
            }: Theme) =>
              `${linearGradient(
                rgba(gradients.dark.main, 0.2),
                rgba(gradients.dark.state, 0.2),
              )}, url(${'/images/banner.jpg'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <MDBox display="flex" justifyContent="center">
            <MDTypography
              fontWeight="bold"
              color="light"
              sx={{
                pt: 43,
                fontSize: 70,
              }}
            >
              {i18n('home.banner.title')}
            </MDTypography>
          </MDBox>
          <MDBox display="flex" justifyContent="center">
            <MDBox
              component={Link}
              to="/schools"
              mt={2}
              p={1.5}
              border="3px solid white"
            >
              <MDTypography
                color="white"
                variant="h3"
                textTransform="uppercase"
                fontWeight="medium"
              >
                {i18n('home.banner.button')}
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
        <Card>
          <Container>
            <MDBox my={8}>
              <Grid container spacing={1.6}>
                <Grid item md={6} xs={12}>
                  <MDBox
                    component="img"
                    src={'/images/logo-white.png'}
                    alt="Brand"
                    width="10rem"
                    sx={{ pb: 3 }}
                  />
                  <MDTypography
                    variant="h5"
                    fontWeight="regular"
                    color="text"
                  >
                    {i18n('home.footer.description')}
                  </MDTypography>
                </Grid>
                <Grid item md={6} xs={12}>
                  <MDTypography
                    variant="h2"
                    color="dark"
                    sx={{ pb: 3 }}
                  >
                    {i18n('home.footer.contact.title')}
                  </MDTypography>
                  <MDBox
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <MDTypography
                      variant="h5"
                      color="text"
                      fontWeight="regular"
                    >
                      {i18n('home.footer.contact.email')}
                    </MDTypography>
                    <MDBox component={Link} to="/admin">
                      <MDTypography
                        variant="h5"
                        color="info"
                        fontWeight="medium"
                        sx={{ textDecoration: 'underline' }}
                      >
                        {i18n('home.footer.admin')}
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          </Container>
        </Card>
        <MDBox
          textAlign="center"
          width="100%"
          bgColor="info"
          paddingY={1}
        >
          <MDTypography
            color="white"
            variant="h5"
            fontWeight="light"
          >
            {i18n('home.footer.copyright')}
          </MDTypography>
        </MDBox>
      </PageLayout>
    </>
  );
}
