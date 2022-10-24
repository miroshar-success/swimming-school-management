/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { ReactNode } from 'react';

// @mui material components
import Grid from '@mui/material/Grid';
import { Theme } from '@mui/material/styles';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';

// Material Dashboard 2 PRO React TS examples components
import DefaultNavbar from 'src/mui/shared/Navbars/DefaultNavbar';
import PageLayout from 'src/mui/shared/Layouts/PageLayout';

// Authentication pages components
import Footer from 'src/mui/shared/Layouts/Footer';

// Declaring props types for BasicLayout
interface Props {
  image: string;
  children: ReactNode;
}

function BasicLayout({
  image,
  children,
}: Props): JSX.Element {
  return (
    <PageLayout>
      <MDBox
        position="absolute"
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({
            functions: { linearGradient, rgba },
            palette: { gradients },
          }: Theme) =>
            image &&
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6),
            )}, url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <MDBox px={0.8} width="100%" height="100vh" mx="auto">
        <Grid
          container
          spacing={0.8}
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Grid
            item
            xs={11}
            sm={9}
            md={5}
            lg={4}
            xl={3}
            position="relative"
            zIndex={2}
          >
            {children}
          </Grid>
        </Grid>
      </MDBox>
      <Footer light />
    </PageLayout>
  );
}

export default BasicLayout;
