/* eslint-disable no-unused-vars */
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
import Grid from '@mui/material/Grid';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

// for MUI 2 Dashboard
import muiActions from 'src/modules/mui/muiActions';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';

// Declaring prop types for DefaultStatisticsCard
interface Props {
  title: string;
  count: string | number;
  percentage?: {
    color:
      | 'primary'
      | 'secondary'
      | 'info'
      | 'success'
      | 'warning'
      | 'error'
      | 'dark'
      | 'white';
    value: string | number;
    label: string;
  };
  dropdown?: {
    action: (...args: any) => void;
    menu: ReactNode;
    value: string;
  };
  [key: string]: any;
}

function DefaultStatisticsCard({
  title,
  count,
  percentage,
  dropdown,
}: Props): JSX.Element {
  const { darkMode } = selectMuiSettings();

  return (
    <Card>
      <MDBox p={1.6}>
        <Grid container>
          <Grid item xs={7}>
            <MDBox mb={0.4} lineHeight={1}>
              <MDTypography
                variant="button"
                fontWeight="medium"
                color="text"
                textTransform="capitalize"
              >
                {title}
              </MDTypography>
            </MDBox>
            <MDBox lineHeight={1}>
              <MDTypography variant="h5" fontWeight="bold">
                {count}
              </MDTypography>
              <MDTypography
                variant="button"
                fontWeight="bold"
                color={percentage.color}
              >
                {percentage.value}&nbsp;
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color={darkMode ? 'text' : 'secondary'}
                >
                  {percentage.label}
                </MDTypography>
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={5}>
            {dropdown && (
              <MDBox
                width="100%"
                textAlign="right"
                lineHeight={1}
              >
                <MDTypography
                  variant="caption"
                  color="secondary"
                  fontWeight="regular"
                  sx={{ cursor: 'pointer' }}
                  onClick={dropdown.action}
                >
                  {dropdown.value}
                </MDTypography>
                {dropdown.menu}
              </MDBox>
            )}
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of DefaultStatisticsCard
DefaultStatisticsCard.defaultProps = {
  percentage: {
    color: 'success',
    value: '',
    label: '',
  },
  dropdown: false,
};

export default DefaultStatisticsCard;
