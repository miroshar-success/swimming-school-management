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
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

// Declaring props types for DefaultInfoCard
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
  title: string;
  description?: string;
  value?: string | number;
  [key: string]: any;
}

function DefaultInfoCard({
  color,
  icon,
  title,
  description,
  value,
}: Props): JSX.Element {
  return (
    <Card>
      <MDBox
        p={1.6}
        mx={2.4}
        display="flex"
        justifyContent="center"
      >
        <MDBox
          display="grid"
          justifyContent="center"
          alignItems="center"
          bgColor={color}
          color="white"
          width="3.2rem"
          height="3.2rem"
          shadow="md"
          borderRadius="lg"
          variant="gradient"
        >
          <Icon>{icon}</Icon>
        </MDBox>
      </MDBox>
      <MDBox
        pb={1.6}
        px={1.6}
        textAlign="center"
        lineHeight={1.25}
      >
        <MDTypography
          variant="h6"
          fontWeight="medium"
          textTransform="capitalize"
        >
          {title}
        </MDTypography>
        {description && (
          <MDTypography
            variant="caption"
            color="text"
            fontWeight="regular"
          >
            {description}
          </MDTypography>
        )}
        {description && !value ? null : <Divider />}
        {value && (
          <MDTypography variant="h5" fontWeight="medium">
            {value}
          </MDTypography>
        )}
      </MDBox>
    </Card>
  );
}

// Declaring default props for DefaultInfoCard
DefaultInfoCard.defaultProps = {
  color: 'info',
  value: '',
  description: '',
};

export default DefaultInfoCard;
