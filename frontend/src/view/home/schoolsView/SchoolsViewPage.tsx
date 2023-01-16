import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';

import { Grid } from '@mui/material';

import PageLayout from 'src/mui/shared/Layouts/PageLayout';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

import Header from '../layout/Header';
import Footer from '../layout/Footer';
import SchoolsViewFilter from '../schoolsView/SchoolsViewFilter';
import SchoolsViewLayout from 'src/view/home/schoolsView/SchoolsViewLayout';
import { Theme } from '@mui/material/styles';

export default function HomeViewPage(props) {
  return (
    <>
      <PageLayout>
        <Header />
        <MDBox
          display="flex"
          justifyContent="center"
          pt={15}
          pb={8}
          sx={({
            palette: {
              transparent: transparentColor,
              white,
            },
            functions: { rgba },
          }: any) => ({
            backgroundColor: rgba(white.main, 0.4),
          })}
        >
          <MDBox width="80%">
            <MDBox textAlign="center" pb={4}>
              <MDTypography variant="h1">
                {i18n('schools.title')}
              </MDTypography>
            </MDBox>
            <Grid container spacing={2.4}>
              <Grid item md={3} xs={12}>
                <SchoolsViewFilter />
              </Grid>
              <Grid item md={9} xs={12}>
                <SchoolsViewLayout />
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
        <Footer />
      </PageLayout>
    </>
  );
}
