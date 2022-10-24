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
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

// for MUI 2 Dashboard
import muiActions from 'src/modules/mui/muiActions';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';

// Decalaring props types for MiniStatisticsCard
interface Props {
  bgColor?:
    | 'white'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'dark';
  title?: {
    fontWeight?: 'light' | 'regular' | 'medium' | 'bold';
    text?: string;
  };
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
    text: string | number;
  };
  icon: {
    color:
      | 'primary'
      | 'secondary'
      | 'info'
      | 'success'
      | 'warning'
      | 'error'
      | 'dark';
    component: ReactNode;
  };
  direction?: 'right' | 'left';
  [key: string]: any;
}

function MiniStatisticsCard({
  bgColor,
  title,
  count,
  percentage,
  icon,
  direction,
}: Props): JSX.Element {
  const { darkMode } = selectMuiSettings();

  return (
    <Card sx={{ overflow: 'hidden' }}>
      <MDBox
        bgColor={bgColor}
        variant="gradient"
        sx={({
          palette: { background },
        }: {
          palette: any;
        }) => ({
          background: darkMode && background.card,
        })}
      >
        <MDBox p={1.6}>
          <Grid container alignItems="center">
            {direction === 'left' ? (
              <Grid item xs={4}>
                <MDBox
                  variant="gradient"
                  bgColor={
                    bgColor === 'white'
                      ? icon.color
                      : 'white'
                  }
                  color={
                    bgColor === 'white' ? 'white' : 'dark'
                  }
                  width="3.2rem"
                  height="3.2rem"
                  borderRadius="md"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  shadow="md"
                >
                  <Icon fontSize="medium" color="inherit">
                    {icon.component}
                  </Icon>
                </MDBox>
              </Grid>
            ) : null}
            <Grid item xs={8}>
              <MDBox
                ml={direction === 'left' ? 2 : 0}
                lineHeight={1}
                textAlign={
                  direction === 'left' ? 'right' : 'left'
                }
              >
                <MDTypography
                  variant="button"
                  color={
                    bgColor === 'white' ? 'text' : 'white'
                  }
                  opacity={bgColor === 'white' ? 1 : 0.7}
                  textTransform="capitalize"
                  fontWeight={title.fontWeight}
                >
                  {title.text}
                </MDTypography>
                <MDTypography
                  variant="h5"
                  fontWeight="bold"
                  color={
                    bgColor === 'white' ? 'dark' : 'white'
                  }
                >
                  {count}{' '}
                  <MDTypography
                    variant="button"
                    color={percentage.color}
                    fontWeight="bold"
                  >
                    {percentage.text}
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </Grid>
            {direction === 'right' ? (
              <Grid item xs={4}>
                <MDBox
                  variant="gradient"
                  bgColor={
                    bgColor === 'white'
                      ? icon.color
                      : 'white'
                  }
                  color={
                    bgColor === 'white' ? 'white' : 'dark'
                  }
                  width="3.2rem"
                  height="3.2rem"
                  marginLeft="auto"
                  borderRadius="md"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  shadow="md"
                >
                  <Icon fontSize="medium" color="inherit">
                    {icon.component}
                  </Icon>
                </MDBox>
              </Grid>
            ) : null}
          </Grid>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Declaring default props for MiniStatisticsCard
MiniStatisticsCard.defaultProps = {
  bgColor: 'white',
  title: {
    fontWeight: 'light',
    text: '',
  },
  percentage: {
    color: 'success',
    text: '',
  },
  direction: 'right',
};

export default MiniStatisticsCard;
