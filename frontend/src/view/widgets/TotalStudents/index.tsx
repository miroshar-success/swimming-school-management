import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MDBox from 'src/mui/components/MDBox';

import { i18n } from 'src/i18n';
import actions from 'src/modules/widget/totalUsers/totalUsersActions';
import totalUsersSelectors from 'src/modules/widget/totalUsers/totalUsersSelectors';
import totalUsersEnumerators from 'src/modules/widget/totalUsers/totalUsersEnumerators';
import ComplexStatisticsCard from 'src/view/shared/cards/ComplexStatisticsCard';

interface TotalStudentsProps {
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

function TotalStudents({
  title,
  color,
}: TotalStudentsProps): JSX.Element {
  const dispatch = useDispatch();

  const isLoading = useSelector(
    totalUsersSelectors.selectLoading,
  );

  const total = useSelector(
    totalUsersSelectors.selectTotalStudents,
  );

  useEffect(() => {
    dispatch(actions.doGetTotalStudents());
  }, [dispatch]);

  console.log(total);

  return (
    <>
      <MDBox height="100%" mt={2}>
        {!isLoading && (
          <ComplexStatisticsCard
            title={title}
            count={total}
            color={color}
            icon="leaderboard"
          />
        )}
      </MDBox>
    </>
  );
}

TotalStudents.defaultProps = {
  title: i18n('widgets.totalStudents.title'),
  color: 'info',
};

export default TotalStudents;
