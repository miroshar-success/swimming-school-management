import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@mui/material/Card';

import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import ReportsBarChart from 'src/mui/shared/Charts/BarCharts/ReportsBarChart';

import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import actions from 'src/modules/widget/totalPaymentPerMonth/totalPaymentPerMonthActions';
import totalPaymentPerMonthSelectors from 'src/modules/widget/totalPaymentPerMonth/totalPaymentPerMonthSelectors';
import Spinner from 'src/view/shared/Spinner';
import totalPaymentPerMonthEnumerators from 'src/modules/widget/totalPaymentPerMonth/totalPaymentPerMonthEnumerators';

interface TotalPaymentPerMonthProps {
  title?: string;
  description?: string;
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
}

function TotalPaymentPerMonth({
  title,
  description,
  color,
  date,
}: TotalPaymentPerMonthProps): JSX.Element {
  const dispatch = useDispatch();

  const isLoading = useSelector(
    totalPaymentPerMonthSelectors.selectLoading,
  );

  const total = useSelector(
    totalPaymentPerMonthSelectors.selectTotal,
  );

  useEffect(() => {
    dispatch(actions.doList());
  }, [dispatch]);

  console.log(total);

  return (
    <>
      <Card sx={{ height: '100%' }}>
        <MDBox height="100%">
          <ReportsBarChart
            color={color}
            title={title}
            description={description}
            date={date}
            chart={{
              labels:
                totalPaymentPerMonthEnumerators.months,
              datasets: {
                label: 'Income',
                data: total,
              },
            }}
          />
          {isLoading && (
            <MDBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              position="absolute"
              width="100%"
              height="100%"
              top="0"
              zIndex={2}
            >
              <Spinner size={100} />
            </MDBox>
          )}
        </MDBox>
      </Card>
    </>
  );
}

TotalPaymentPerMonth.defaultProps = {
  title: i18n('widgets.totalPaymentPerMonth.title'),
  description: i18n(
    'widgets.totalPaymentPerMonth.description',
  ),
  color: 'success',
  date: i18n('widgets.totalPaymentPerMonth.date'),
};

export default TotalPaymentPerMonth;
