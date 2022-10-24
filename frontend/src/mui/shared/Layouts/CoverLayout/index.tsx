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

// Authentication layout components
import Footer from 'src/mui/shared/Layouts/Footer';

// Declaring props types for CoverLayout
interface Props {
  coverHeight?: string;
  image: string;
  children: ReactNode;
  gridProps?: any;
}

function CoverLayout({
  coverHeight,
  image,
  children,
  gridProps,
}: Props): JSX.Element {
  return (
    <PageLayout>
      {/* <DefaultNavbar
        routes={pageRoutes}
        action={{
          type: "external",
          route: "https://creative-tim.com/product/material-dashboard-2-pro-react-ts",
          label: "buy now",
          color: "info",
        }}
        transparent
        light
      /> */}
      <MDBox
        width="calc(100% - 1.6rem)"
        minHeight={coverHeight}
        borderRadius="xl"
        mx={1.6}
        my={1.6}
        pt={4.8}
        pb={22.4}
        sx={{
          backgroundImage: ({
            functions: { linearGradient, rgba },
            palette: { gradients },
          }: Theme) =>
            image &&
            `${linearGradient(
              rgba(gradients.dark.main, 0.4),
              rgba(gradients.dark.state, 0.4),
            )}, url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <MDBox
        mt={{ xs: -20, lg: -18 }}
        px={0.8}
        width="calc(100% - 1.6rem)"
        mx="auto"
      >
        <Grid
          container
          spacing={0.8}
          justifyContent="center"
        >
          <Grid
            item
            xs={11}
            sm={9}
            md={5}
            lg={4}
            xl={3}
            {...gridProps}
            position="relative"
            zIndex={2}
          >
            {children}
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </PageLayout>
  );
}

// Declaring default props for CoverLayout
CoverLayout.defaultProps = {
  coverHeight: '35vh',
  gridProps: {},
};

export default CoverLayout;
