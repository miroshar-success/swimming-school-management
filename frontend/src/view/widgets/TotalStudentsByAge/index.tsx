import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@mui/material/Card';

import MDBox from 'src/mui/components/MDBox';
import ReportsLineChart from 'src/mui/shared/Charts/LineCharts/ReportsLineChart';

import { i18n } from 'src/i18n';
import actions from 'src/modules/widget/totalStudentsByAge/totalStudentsByAgeActions';
import totalStudentsByAgeSelectors from 'src/modules/widget/totalStudentsByAge/totalStudentsByAgeSelectors';
import totalStudentsByAgeEnumerators from 'src/modules/widget/totalStudentsByAge/totalStudentsByAgeEnumerators';

interface TotalStudentsByAgeProps {
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

function TotalStudentsByAge({
  title,
  description,
  color,
  date,
}: TotalStudentsByAgeProps): JSX.Element {
  const dispatch = useDispatch();

  const isLoading = useSelector(
    totalStudentsByAgeSelectors.selectLoading,
  );

  const total = useSelector(
    totalStudentsByAgeSelectors.selectTotal,
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
                labels: totalStudentsByAgeEnumerators.ages,
                datasets: {
                  label: i18n(
                    'widgets.totalStudentsByAge.label',
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

TotalStudentsByAge.defaultProps = {
  title: i18n('widgets.totalStudentsByAge.title'),
  description: i18n(
    'widgets.totalStudentsByAge.description',
  ),
  color: 'dark',
  date: i18n('widgets.totalStudentsByAge.date'),
};

export default TotalStudentsByAge;
