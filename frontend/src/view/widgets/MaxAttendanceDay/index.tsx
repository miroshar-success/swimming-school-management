import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MDBox from 'src/mui/components/MDBox';

import { i18n } from 'src/i18n';
import actions from 'src/modules/widget/maxAttendanceDay/maxAttendanceDayActions';
import maxAttendanceDaySelectors from 'src/modules/widget/maxAttendanceDay/maxAttendanceDaySelectors';
import maxAttendanceDayEnumerators from 'src/modules/widget/maxAttendanceDay/maxAttendanceDayEnumerators';
import ComplexStatisticsCard from 'src/view/shared/cards/ComplexStatisticsCard';

interface MaxAttendanceDayProps {
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

function MaxAttendanceDay({
  title,
  color,
}: MaxAttendanceDayProps): JSX.Element {
  const dispatch = useDispatch();

  const isLoading = useSelector(
    maxAttendanceDaySelectors.selectLoading,
  );

  const day = useSelector(
    maxAttendanceDaySelectors.selectDay,
  );

  useEffect(() => {
    dispatch(actions.doGetMaxAttendanceDay());
  }, [dispatch]);

  console.log(day);

  return (
    <>
      <MDBox height="100%">
        {!isLoading && (
          <ComplexStatisticsCard
            title={title}
            count={maxAttendanceDayEnumerators.day[day.day]}
            label={`${day.number} lessons`}
            color={color}
            icon="event"
          />
        )}
      </MDBox>
    </>
  );
}

MaxAttendanceDay.defaultProps = {
  title: i18n('widgets.maxAttendanceDay.title'),
  color: 'dark',
};

export default MaxAttendanceDay;
