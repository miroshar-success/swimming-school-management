import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@mui/material/Card';

import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import ReportsBarChart from 'src/mui/shared/Charts/BarCharts/ReportsBarChart';

import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import actions from 'src/modules/widget/totalPaidStudentsPerMonth/totalPaidStudentsPerMonthActions';
import totalPaidStudentsPerMonthSelectors from 'src/modules/widget/totalPaidStudentsPerMonth/totalPaidStudentsPerMonthSelectors';
import Spinner from 'src/view/shared/Spinner';
import totalPaidStudentsPerMonthEnumerators from 'src/modules/widget/totalPaidStudentsPerMonth/totalPaidStudentsPerMonthEnumerators';

interface TotalPaidStudentsPerMonthProps {
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

function TotalPaidStudentsPerMonth({
  title,
  description,
  color,
  date,
}: TotalPaidStudentsPerMonthProps): JSX.Element {
  const dispatch = useDispatch();

  const isLoading = useSelector(
    totalPaidStudentsPerMonthSelectors.selectLoading,
  );

  const total = useSelector(
    totalPaidStudentsPerMonthSelectors.selectTotal,
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
                totalPaidStudentsPerMonthEnumerators.months,
              datasets: {
                label: i18n(
                  'widgets.totalPaidStudentsPerMonth.label',
                ),
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

TotalPaidStudentsPerMonth.defaultProps = {
  title: i18n('widgets.totalPaidStudentsPerMonth.title'),
  description: i18n(
    'widgets.totalPaidStudentsPerMonth.description',
  ),
  color: 'info',
  date: i18n('widgets.totalPaidStudentsPerMonth.date'),
};

export default TotalPaidStudentsPerMonth;
