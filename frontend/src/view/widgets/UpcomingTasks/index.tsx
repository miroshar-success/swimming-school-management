import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import TimelineList from 'src/mui/shared/Timeline/TimelineList';

import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import actions from 'src/modules/widget/upcomingTasks/upcomingTasksActions';
import selectors from 'src/modules/widget/upcomingTasks/upcomingTasksSelectors';
import Spinner from 'src/view/shared/Spinner';
import UpcomingTaskItem from 'src/view/widgets/UpcomingTasks/UpcomingTaskItem';
import { i18n } from 'src/i18n';
import { getUserNameOrEmailPrefix } from 'src/modules/utils';
import MDTypography from 'src/mui/components/MDTypography';
import { DEFAULT_MOMENT_FORMAT } from 'src/config/common';

function UpcomingTasks(): JSX.Element {
  const dispatch = useDispatch();

  const { darkMode } = selectMuiSettings();

  const isLoading = useSelector(selectors.selectLoading);
  const upcomingTasks = useSelector(
    selectors.selectUpcomingTasks,
  );

  const limitedTasks = upcomingTasks.slice(0, 5);

  useEffect(() => {
    dispatch(actions.doInit());
  }, [dispatch]);

  const renderUpcomingTasks = isLoading ? (
    <Spinner />
  ) : limitedTasks.length > 0 ? (
    limitedTasks.map(
      ({ taskList, title, dueDate, owner }, i, a) => (
        <UpcomingTaskItem
          key={`upcoming-task-${i}`}
          color={taskList[0].taskdisplaycolor}
          title={title}
          owner={getUserNameOrEmailPrefix(owner)}
          dateTime={moment(dueDate).format(
            DEFAULT_MOMENT_FORMAT,
          )}
          lastItem={i + 1 === a.length}
        />
      ),
    )
  ) : (
    <MDTypography
      variant="body2"
      color="secondary"
      textAlign="center"
      fontWeight="regular"
    >
      {i18n('table.noData')}
    </MDTypography>
  );

  return (
    <TimelineList
      title={i18n('widgets.upcomingTasks.title')}
      dark={darkMode}
      height="304px"
    >
      {renderUpcomingTasks}
    </TimelineList>
  );
}

export default UpcomingTasks;
