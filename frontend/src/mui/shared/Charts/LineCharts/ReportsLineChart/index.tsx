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
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

// ReportsLineChart configurations
import configs from 'src/mui/shared/Charts/LineCharts/ReportsLineChart/configs';

// Declaring props types for ReportsLineChart
interface Props {
  color?:
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'dark';
  title: string;
  description?: string | ReactNode;
  date: string;
  chart: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
    };
  };
  [key: string]: any;
}

function ReportsLineChart({
  color,
  title,
  description,
  date,
  chart,
}: Props): JSX.Element {
  const { data, options } = configs(
    chart.labels || [],
    chart.datasets || {},
  );

  return (
    <Card sx={{ height: '100%' }}>
      <MDBox padding="0.8rem">
        {useMemo(
          () => (
            <MDBox
              variant="gradient"
              bgColor={color}
              borderRadius="lg"
              coloredShadow={color}
              py={1.6}
              pr={0.4}
              mt={-5}
              height="10rem"
            >
              <Line data={data} options={options} />
            </MDBox>
          ),
          [chart, color],
        )}
        <MDBox pt={2.4} pb={0.8} px={0.8}>
          <MDTypography
            variant="h6"
            textTransform="capitalize"
          >
            {title}
          </MDTypography>
          <MDTypography
            component="div"
            variant="button"
            color="text"
            fontWeight="light"
          >
            {description}
          </MDTypography>
          <Divider />
          <MDBox display="flex" alignItems="center">
            <MDTypography
              variant="button"
              color="text"
              lineHeight={1}
              sx={{ mt: 0.15, mr: 0.5 }}
            >
              <Icon>schedule</Icon>
            </MDTypography>
            <MDTypography
              variant="button"
              color="text"
              fontWeight="light"
            >
              {date}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Declaring default props for ReportsLineChart
ReportsLineChart.defaultProps = {
  color: 'dark',
  description: '',
};

export default ReportsLineChart;
