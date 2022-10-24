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

import { useMemo, ReactNode } from 'react';

// react-chartjs-2 components
import { Line } from 'react-chartjs-2';

// @mui material components
import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import MDProgress from 'src/mui/components/MDProgress';

// ProgressLineChart configurations
import configs from 'src/mui/shared/Charts/LineCharts/ProgressLineChart/config';

// Declaring props types for GradientLineChart
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
  count?: string | number;
  progress: number;
  height?: string | number;
  chart: {
    labels: string[];
    data: number[];
  };
  [key: string]: any;
}

function ProgressLineChart({
  color,
  icon,
  title,
  count,
  progress,
  height,
  chart,
}: Props): JSX.Element {
  const { data, options } = configs(
    color,
    chart.labels || [],
    title,
    chart.data || [],
  );

  return (
    <Card>
      <MDBox
        display="flex"
        alignItems="center"
        pt={1.6}
        px={1.6}
      >
        <MDBox
          width="2.4rem"
          height="2.4rem"
          display="grid"
          justifyContent="center"
          alignItems="center"
          borderRadius="md"
          shadow="md"
          color="white"
          bgColor={color}
          variant="gradient"
        >
          <Icon>{icon}</Icon>
        </MDBox>
        <MDBox ml={1.6} lineHeight={1}>
          <MDTypography
            variant="button"
            fontWeight="regular"
            textTransform="capitalize"
            color="text"
          >
            {title}
          </MDTypography>
          {count ? (
            <MDTypography variant="h5" fontWeight="bold">
              {count}
            </MDTypography>
          ) : null}
        </MDBox>
        <MDBox width="25%" ml="auto">
          <MDTypography
            display="block"
            variant="caption"
            fontWeight="medium"
            color="text"
          >
            {progress}%
          </MDTypography>
          <MDBox mt={0.2}>
            <MDProgress
              variant="gradient"
              color={color}
              value={progress}
            />
          </MDBox>
        </MDBox>
      </MDBox>
      {useMemo(
        () => (
          <MDBox mt={1.6}>
            <Line data={data} options={options} />
            {/*style={{ height }}*/}
          </MDBox>
        ),
        [chart, height, color],
      )}
    </Card>
  );
}

// Declaring default props for ProgressLineChart
ProgressLineChart.defaultProps = {
  color: 'info',
  count: 0,
  height: '5rem',
};

export default ProgressLineChart;
