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
import Card from '@mui/material/Card';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

// Timeline context
import { TimelineProvider } from 'src/mui/shared/Timeline/context';

// Declaring props types for TimelineList
interface Props {
  title: string;
  dark?: boolean;
  height?: string;
  children: ReactNode;
}

function TimelineList({
  title,
  dark,
  height,
  children,
}: Props): JSX.Element {
  return (
    <TimelineProvider value={dark}>
      <Card sx={{ height: '100%' }}>
        <MDBox height={height}>
          <MDBox pt={2.4} px={1.6}>
            <MDTypography variant="h6" fontWeight="medium">
              {title}
            </MDTypography>
          </MDBox>
          <MDBox p={1.6}>{children}</MDBox>
        </MDBox>
      </Card>
    </TimelineProvider>
  );
}

// Declaring default props for TimelineList
TimelineList.defaultProps = {
  dark: false,
};

export default TimelineList;
