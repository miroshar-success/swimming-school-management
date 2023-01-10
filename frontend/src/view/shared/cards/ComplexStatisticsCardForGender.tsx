import { ReactNode } from 'react';

// @mui material components
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import { i18n } from 'src/i18n';

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
  countMale: string | number;
  countFemale: string | number;
  icon: ReactNode;
  [key: string]: any;
}

function ComplexStatisticsCardForGender({
  color,
  title,
  countMale,
  countFemale,
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
            variant="h6"
            fontWeight="medium"
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
            pt={1}
          >
            <MDTypography variant="h4">
              {i18n('widgets.countMaleAndFemale.male')}
            </MDTypography>
            <MDTypography variant="h5" mt={0.5}>
              &nbsp;&nbsp;&nbsp;{countMale}
            </MDTypography>
          </MDBox>
          <MDBox
            display="flex"
            textAlign="right"
            justifyContent="end"
            alignItems="center"
            pr={1}
            pt={1}
            pb={2}
          >
            <MDTypography variant="h4">
              {i18n('widgets.countMaleAndFemale.female')}
            </MDTypography>
            <MDTypography variant="h5" mt={0.5}>
              &nbsp;&nbsp;&nbsp;{countFemale}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Declaring defualt props for ComplexStatisticsCard
ComplexStatisticsCardForGender.defaultProps = {
  color: 'info',
};

export default ComplexStatisticsCardForGender;
