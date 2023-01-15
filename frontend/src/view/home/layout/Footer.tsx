import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';

import { Card, Container, Grid } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';

import MDTypography from 'src/mui/components/MDTypography';

export default function Footer(props) {
  return (
    <>
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
    </>
  );
}
