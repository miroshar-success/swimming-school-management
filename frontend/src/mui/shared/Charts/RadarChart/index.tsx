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
import { Radar } from 'react-chartjs-2';

// @mui material components
import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

// RadarChart configurations
import configs from 'src/mui/shared/Charts/RadarChart/configs';

// Material Dashboard 2 PRO React TS Base Styles
import colors from 'src/mui/assets/theme/base/colors';

// Material Dashboard 2 PRO React TS Helper Functions
import rgba from 'src/mui/assets/theme/functions/rgba';

// Declaring props types for RadarChart
interface Props {
  icon?: {
    color?:
      | 'primary'
      | 'secondary'
      | 'info'
      | 'success'
      | 'warning'
      | 'error'
      | 'light'
      | 'dark';
    component: ReactNode;
  };
  title?: string;
  description?: string | ReactNode;
  chart: {
    labels: string[];
    datasets: {
      label: string;
      color:
        | 'primary'
        | 'secondary'
        | 'info'
        | 'success'
        | 'warning'
        | 'error'
        | 'light'
        | 'dark';
      data: number[];
      borderDash?: number[];
    }[];
  };
  [key: string]: any;
}

function RadarChart({
  icon,
  title,
  description,
  chart,
}: Props): JSX.Element {
  const chartDatasets = chart.datasets
    ? chart.datasets.map((dataset) => ({
        ...dataset,
        backgroundColor: colors[dataset.color]
          ? rgba(colors[dataset.color || 'dark'].main, 0.2)
          : rgba(colors.dark.main, 0.2),
      }))
    : [];

  const { data, options } = configs(
    chart.labels || [],
    chartDatasets,
  );

  const renderChart = (
    <MDBox py={1.6} pr={1.6} pl={icon.component ? 1 : 2}>
      {title || description ? (
        <MDBox
          display="flex"
          px={description ? 1 : 0}
          pt={description ? 1 : 0}
        >
          {icon.component && (
            <MDBox
              width="3.2rem"
              height="3.2rem"
              bgColor={icon.color || 'info'}
              variant="gradient"
              coloredShadow={icon.color || 'info'}
              borderRadius="xl"
              display="flex"
              justifyContent="center"
              alignItems="center"
              color="white"
              mt={-5}
              mr={1.6}
            >
              <Icon fontSize="medium">
                {icon.component}
              </Icon>
            </MDBox>
          )}
          <MDBox mt={icon.component ? -2 : 0}>
            {title && (
              <MDTypography variant="h6">
                {title}
              </MDTypography>
            )}
            <MDBox mb={1.6}>
              <MDTypography
                component="div"
                variant="button"
                color="text"
              >
                {description}
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      ) : null}
      {useMemo(
        () => (
          <MDBox p={4.8}>
            <Radar data={data} options={options} />
          </MDBox>
        ),
        [chart],
      )}
    </MDBox>
  );

  return title || description ? (
    <Card>{renderChart}</Card>
  ) : (
    renderChart
  );
}

// Declaring default props for RadarChart
RadarChart.defaultProps = {
  icon: { color: 'info', component: '' },
  title: '',
  description: '',
};

export default RadarChart;
