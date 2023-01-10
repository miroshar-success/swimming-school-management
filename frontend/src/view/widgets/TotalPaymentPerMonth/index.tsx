import React, { useEffect, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';

import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import VerticalBarChart from 'src/mui/shared/Charts/BarCharts/VerticalBarChart';
import DefaultStatisticsCard from 'src/view/shared/cards/DefaultStatisticsCard';

import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import actions from 'src/modules/widget/totalPaymentPerMonth/totalPaymentPerMonthActions';
import totalPaymentPerMonthSelectors from 'src/modules/widget/totalPaymentPerMonth/totalPaymentPerMonthSelectors';
import Spinner from 'src/view/shared/Spinner';
import totalPaymentPerMonthEnumerators from 'src/modules/widget/totalPaymentPerMonth/totalPaymentPerMonthEnumerators';
import { Grid } from '@mui/material';

interface TotalPaymentPerMonthProps {
  title?: string;
  color?:
    | 'dark'
    | 'success'
    | 'info'
    | 'primary'
    | 'secondary'
    | 'warning'
    | 'error';
  date?: string;
  label?: string;
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
}

function TotalPaymentPerMonth({
  title,
  color,
  date,
  icon,
}: TotalPaymentPerMonthProps): JSX.Element {
  const dispatch = useDispatch();

  const isLoading = useSelector(
    totalPaymentPerMonthSelectors.selectLoading,
  );

  const total = useSelector(
    totalPaymentPerMonthSelectors.selectTotal,
  );

  const income = useSelector(
    totalPaymentPerMonthSelectors.selectIncome,
  );

  useEffect(() => {
    dispatch(actions.doList());
  }, [dispatch]);

  console.log(total);

  return (
    <>
      <MDBox mb={4}>
        {!isLoading && (
          <Card sx={{ height: '100%' }}>
            {title ? (
              <MDBox display="flex">
                {icon.component && (
                  <MDBox
                    width="4.2rem"
                    height="4.2rem"
                    bgColor={icon.color || 'info'}
                    variant="gradient"
                    coloredShadow={icon.color || 'info'}
                    borderRadius="xl"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    color="white"
                    mt={-2.5}
                    ml={5}
                  >
                    <Icon fontSize="medium">
                      {icon.component}
                    </Icon>
                  </MDBox>
                )}
                <MDBox mt={1} ml={2}>
                  {title && (
                    <MDTypography variant="h3">
                      {title}
                    </MDTypography>
                  )}
                </MDBox>
              </MDBox>
            ) : null}
            <MDBox height="100%">
              <MDBox p={2.4}>
                <Grid container spacing={1.6}>
                  <Grid item md={3} xs={12}>
                    <DefaultStatisticsCard
                      title={i18n(
                        'widgets.incomeToday.title',
                      )}
                      count={`${income} BRL`}
                    />
                  </Grid>
                  <Grid item md={9} xs={12}>
                    <VerticalBarChart
                      chart={{
                        labels:
                          totalPaymentPerMonthEnumerators.months,
                        datasets: [
                          {
                            label: i18n(
                              'widgets.totalPaymentPerMonth.label',
                            ),
                            data: total,
                            color: color,
                          },
                        ],
                      }}
                    />
                  </Grid>
                </Grid>
              </MDBox>
            </MDBox>
          </Card>
        )}
      </MDBox>
    </>
  );
}

TotalPaymentPerMonth.defaultProps = {
  title: i18n('widgets.totalPaymentPerMonth.title'),
  color: 'info',
  date: i18n('widgets.totalPaymentPerMonth.date'),
  icon: { color: 'success', component: 'paid' },
};

export default TotalPaymentPerMonth;
