import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';

import { Theme } from '@mui/material/styles';

import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

export default function Banner(props) {
  return (
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
            pt: '55vh',
            fontSize: { xs: 50, lg: 70 },
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
  );
}
