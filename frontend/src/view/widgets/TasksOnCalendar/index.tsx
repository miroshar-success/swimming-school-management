import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FullCalendar, {
  EventContentArg,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule';

import Card from '@mui/material/Card';

import $ from 'jquery';

import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

import CalendarRoot from 'src/mui/shared/Calendar/CalendarRoot';

import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import actions from 'src/modules/widget/tasksOnCalendar/tasksOnCalendarActions';
import TaskViewModal from 'src/view/widgets/TasksOnCalendar/TaskViewModal';
import RecurringTaskModal from 'src/view/widgets/TasksOnCalendar/RecurringTaskModal';
import taskSelectors from 'src/modules/task/taskSelectors';
import tasksOnCalendarSelectors from 'src/modules/widget/tasksOnCalendar/tasksOnCalendarSelectors';
import TaskFormModal from 'src/view/widgets/TasksOnCalendar/TaskFormModal';
import Message from 'src/view/shared/message';
import upcomingTasksActions from 'src/modules/widget/upcomingTasks/upcomingTasksActions';
import Spinner from 'src/view/shared/Spinner';

interface TasksOnCalendarProps {
  title?: string;
  date?: string;
}

function TasksOnCalendar({
  title,
  date,
}: TasksOnCalendarProps): JSX.Element {
  const dispatch = useDispatch();

  const { miniSidenav, darkMode } = selectMuiSettings();

  const editable = useSelector(
    taskSelectors.selectPermissionToEdit,
  );

  const isLoading = useSelector(
    tasksOnCalendarSelectors.selectLoading,
  );

  const calendarRef: any = React.useRef();

  useEffect(() => {
    setTimeout(() => {
      calendarRef.current.getApi().updateSize();
    }, 500);
  }, [dispatch, miniSidenav]);

  const handleDateClick = (dateInfo) => {
    if ($(dateInfo.dayEl).hasClass('fc-day-past')) {
      return;
    }
    if (editable) {
      if (
        $('.fc-event:not(.event-success)', dateInfo.dayEl)
          .length === 0
      ) {
        doOpenTaskFormModal(null, dateInfo.date);
      } else {
        doOpenRecurringTaskModal(dateInfo.date);
      }
      calendarRef.current.getApi().select(dateInfo.date);
    }
  };

  const handleEvents = (
    info,
    successCallback,
    failureCallback,
  ) => {
    dispatch(
      actions.doSearch(
        info,
        successCallback,
        failureCallback,
      ),
    );
  };

  const handleEventClick = (eventInfo) => {
    doOpenTaskViewModal(eventInfo.event.id);
  };

  const handleEventDrop = (eventDropInfo) => {
    dispatch(actions.doMove(eventDropInfo, calendarRef));
  };

  const [taskViewModalVisible, setTaskViewModalVisible] =
    useState(false);
  const [taskId4View, setTaskId4View] = useState(null);

  const doCloseTaskViewModal = () => {
    setTaskViewModalVisible(false);
  };

  const doOpenTaskViewModal = (id) => {
    setTaskId4View(id);
    setTaskViewModalVisible(true);
  };

  const doTaskFormModal = () => {
    setTaskFormFromRecurringTaskId(taskId4View);
    setNewTaskDueDate(null);
    setTaskFormModalVisible(true);
  };

  const [
    recurringTaskModalVisible,
    setRecurringTaskModalVisible,
  ] = useState(false);
  const [recurringTaskDate, setRecurringTaskDate] =
    useState(null);

  const doCloseRecurringTaskModal = () => {
    setRecurringTaskModalVisible(false);
  };

  const doOpenRecurringTaskModal = (date) => {
    setRecurringTaskDate(date);
    setRecurringTaskModalVisible(true);
  };

  const [taskFormModalVisible, setTaskFormModalVisible] =
    useState(false);
  const [newTaskDueDate, setNewTaskDueDate] =
    useState(null);
  const [
    taskFormFromRecurringTaskId,
    setTaskFormFromRecurringTaskId,
  ] = useState(null);

  const doCloseTaskFormModal = () => {
    setTaskFormModalVisible(false);
  };

  const doOpenTaskFormModal = (id, dueDate = null) => {
    setTaskFormFromRecurringTaskId(id);
    setNewTaskDueDate(dueDate);
    setTaskFormModalVisible(true);
  };

  const doSuccessOnEditTaskFormModal = () => {
    Message.success(i18n('entities.task.update.success'));
    doCloseTaskFormModal();
    dispatch(upcomingTasksActions.doRefresh());
    calendarRef.current.getApi().refetchEvents();
  };

  const doSuccessOnNewTaskFormModal = () => {
    Message.success(i18n('entities.task.create.success'));
    doCloseTaskFormModal();
    doCloseRecurringTaskModal();
    dispatch(upcomingTasksActions.doRefresh());
    calendarRef.current.getApi().refetchEvents();
  };

  return (
    <>
      <Card sx={{ height: '100%' }}>
        <MDBox
          pt={title || date ? 2.4 : 0}
          px={1.6}
          lineHeight={1}
        >
          {title ? (
            <MDTypography
              variant="h6"
              fontWeight="medium"
              textTransform="capitalize"
            >
              {title}
            </MDTypography>
          ) : null}
          {date ? (
            <MDTypography
              component="p"
              variant="button"
              color="text"
              fontWeight="regular"
            >
              {date}
            </MDTypography>
          ) : null}
        </MDBox>
        <MDBox height="100%">
          <CalendarRoot p={1.6} ownerState={{ darkMode }}>
            {useMemo(
              () => (
                <FullCalendar
                  ref={calendarRef}
                  initialView="dayGridMonth"
                  headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right:
                      'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
                  }}
                  plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                    listPlugin,
                    rrulePlugin,
                  ]}
                  dateClick={handleDateClick}
                  events={handleEvents}
                  eventClick={handleEventClick}
                  eventDrop={handleEventDrop}
                  eventContent={(
                    eventInfo: EventContentArg,
                  ) => {
                    const viewType =
                      calendarRef.current.getApi().view
                        .type;
                    if (viewType === 'listWeek') {
                      return `${eventInfo.event.extendedProps.title} ${eventInfo.event.extendedProps.repeat}`;
                    }
                    return (
                      <div className="fc-event-main-frame">
                        <div className="fc-event-title-container">
                          <div className="fc-event-title fc-sticky">
                            <span>
                              {`${eventInfo.event.extendedProps.title} `}
                            </span>
                            <span>
                              {
                                eventInfo.event
                                  .extendedProps.repeat
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }}
                  height="100%"
                />
              ),
              [dispatch],
            )}
          </CalendarRoot>
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
      {taskViewModalVisible && (
        <TaskViewModal
          id={taskId4View}
          onClose={doCloseTaskViewModal}
          onEdit={doTaskFormModal}
          onSuccess={doSuccessOnEditTaskFormModal}
        />
      )}
      {editable && recurringTaskModalVisible && (
        <RecurringTaskModal
          date={recurringTaskDate}
          onOpenTaskFormModal={doOpenTaskFormModal}
          onClose={doCloseRecurringTaskModal}
        />
      )}
      {editable && taskFormModalVisible && (
        <TaskFormModal
          id={taskFormFromRecurringTaskId}
          dueDate={newTaskDueDate}
          onClose={doCloseTaskFormModal}
          onSuccess={doSuccessOnNewTaskFormModal}
        />
      )}
    </>
  );
}

TasksOnCalendar.defaultProps = {
  title: i18n('widgets.tasksOnCalendar.title'),
};

export default TasksOnCalendar;
