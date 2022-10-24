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
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

interface Props {
  color?:
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'dark';
  icon: ReactNode;
  title: ReactNode;
  description: string;
  [key: string]: any;
}

function MiniInfoCard({
  color,
  icon,
  title,
  description,
}: Props): JSX.Element {
  return (
    <Card>
      <MDBox p={2.4}>
        <MDBox
          display="grid"
          justifyContent="center"
          alignItems="center"
          bgColor={color}
          color="white"
          width="2.4rem"
          height="2.4rem"
          shadow="md"
          borderRadius="lg"
          variant="gradient"
        >
          <Icon>{icon}</Icon>
        </MDBox>
        <MDBox mt={2.1}>
          <MDTypography
            variant="h5"
            fontWeight="medium"
            textTransform="capitalize"
          >
            {title}
          </MDTypography>
          <MDTypography
            variant="body2"
            color="text"
            fontWeight="regular"
          >
            {description}
          </MDTypography>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Declaring default props for MiniInfoCard
MiniInfoCard.defaultProps = {
  color: 'info',
};

export default MiniInfoCard;
