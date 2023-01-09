import { ReactNode } from 'react';

// @mui material components
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

// Declaring props types for CompleStatisticsCard
interface Props {
  color?:
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'light'
    | 'dark';
  title: string;
  count: string | number;
  icon: ReactNode;
  updated?: string;
  label?: string;
  [key: string]: any;
}

function ComplexStatisticsCard({
  color,
  title,
  count,
  updated,
  label,
  icon,
}: Props): JSX.Element {
  return (
    <Card>
      <MDBox
        display="flex"
        justifyContent="space-between"
        pt={0.8}
        px={1.6}
      >
        <MDBox
          variant="gradient"
          bgColor={color}
          color={color === 'light' ? 'dark' : 'white'}
          coloredShadow={color}
          borderRadius="xl"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="3.2rem"
          height="3.2rem"
          mt={-3}
        >
          <Icon fontSize="medium" color="inherit">
            {icon}
          </Icon>
        </MDBox>
        <MDBox textAlign="right" lineHeight={1.25}>
          <MDTypography
            variant="button"
            fontWeight="light"
            color="text"
          >
            {title}
          </MDTypography>
          <MDBox
            display="flex"
            textAlign="right"
            justifyContent="end"
            alignItems="center"
            pr={1}
          >
            <MDTypography variant="h4">
              {count}
            </MDTypography>
            {label && (
              <MDTypography variant="h6" mt={1}>
                &nbsp;&nbsp;{label}
              </MDTypography>
            )}
          </MDBox>
        </MDBox>
      </MDBox>
      <Divider />
      <MDBox pb={1.6} px={1.6}>
        <MDTypography
          component="p"
          variant="button"
          color="text"
          display="flex"
        >
          {updated}
        </MDTypography>
      </MDBox>
    </Card>
  );
}

// Declaring defualt props for ComplexStatisticsCard
ComplexStatisticsCard.defaultProps = {
  color: 'info',
  updated: 'just updated',
};

export default ComplexStatisticsCard;
