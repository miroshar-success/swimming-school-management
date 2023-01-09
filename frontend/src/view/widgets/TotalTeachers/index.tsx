import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@mui/material/Card';

import MDBox from 'src/mui/components/MDBox';
import ReportsLineChart from 'src/mui/shared/Charts/LineCharts/ReportsLineChart';

import { i18n } from 'src/i18n';
import actions from 'src/modules/widget/totalUsers/totalUsersActions';
import totalUsersSelectors from 'src/modules/widget/totalUsers/totalUsersSelectors';
import totalUsersEnumerators from 'src/modules/widget/totalUsers/totalUsersEnumerators';
import ComplexStatisticsCard from 'src/view/shared/cards/ComplexStatisticsCard';

interface TotalTeachersProps {
  title?: string;
  color?:
    | 'dark'
    | 'success'
    | 'info'
    | 'primary'
    | 'secondary'
    | 'warning'
    | 'error';
}

function TotalTeachers({
  title,
  color,
}: TotalTeachersProps): JSX.Element {
  const dispatch = useDispatch();

  const isLoading = useSelector(
    totalUsersSelectors.selectLoading,
  );

  const total = useSelector(
    totalUsersSelectors.selectTotalTeachers,
  );

  useEffect(() => {
    dispatch(actions.doGetTotalTeachers());
  }, [dispatch]);

  console.log(total);

  return (
    <>
      <Card sx={{ height: '100%' }}>
        <MDBox height="100%">
          {!isLoading && (
            <ComplexStatisticsCard
              title={title}
              count={total}
              color={color}
              icon="leaderboard"
            />
          )}
        </MDBox>
      </Card>
    </>
  );
}

TotalTeachers.defaultProps = {
  title: i18n('widgets.totalTeachers.title'),
  color: 'success',
};

export default TotalTeachers;
