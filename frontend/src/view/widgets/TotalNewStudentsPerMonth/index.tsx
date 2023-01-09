import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@mui/material/Card';

import MDBox from 'src/mui/components/MDBox';
import ReportsLineChart from 'src/mui/shared/Charts/LineCharts/ReportsLineChart';

import { i18n } from 'src/i18n';
import actions from 'src/modules/widget/totalNewStudentsPerMonth/totalNewStudentsPerMonthActions';
import totalNewStudentsPerMonthSelectors from 'src/modules/widget/totalNewStudentsPerMonth/totalNewStudentsPerMonthSelectors';
import totalNewStudentsPerMonthEnumerators from 'src/modules/widget/totalNewStudentsPerMonth/totalNewStudentsPerMonthEnumerators';

interface TotalNewStudentsPerMonthProps {
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

function TotalNewStudentsPerMonth({
  title,
  description,
  color,
  date,
}: TotalNewStudentsPerMonthProps): JSX.Element {
  const dispatch = useDispatch();

  const isLoading = useSelector(
    totalNewStudentsPerMonthSelectors.selectLoading,
  );

  const total = useSelector(
    totalNewStudentsPerMonthSelectors.selectTotal,
  );

  useEffect(() => {
    dispatch(actions.doList());
  }, [dispatch]);

  console.log(total);

  return (
    <>
      <Card sx={{ height: '100%' }}>
        <MDBox height="100%">
          {!isLoading && (
            <ReportsLineChart
              color={color}
              title={title}
              description={description}
              date={date}
              chart={{
                labels:
                  totalNewStudentsPerMonthEnumerators.months,
                datasets: {
                  label: i18n(
                    'widgets.totalNewStudentsPerMonth.label',
                  ),
                  data: total,
                },
              }}
            />
          )}
        </MDBox>
      </Card>
    </>
  );
}

TotalNewStudentsPerMonth.defaultProps = {
  title: i18n('widgets.totalNewStudentsPerMonth.title'),
  description: i18n(
    'widgets.totalNewStudentsPerMonth.description',
  ),
  color: 'dark',
  date: i18n('widgets.totalNewStudentsPerMonth.date'),
};

export default TotalNewStudentsPerMonth;
