import { getAbsoluteDateTimeByHour } from 'src/modules/utils';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';
import authSelectors from 'src/modules/auth/authSelectors';
import Errors from 'src/modules/shared/error/errors';
import moment from 'moment';
import taskSelectors from 'src/modules/task/taskSelectors';
import tasksOnCalendarSelectors from 'src/modules/widget/tasksOnCalendar/tasksOnCalendarSelectors';
import TasksOnCalendarService from 'src/modules/widget/tasksOnCalendar/tasksOnCalendarService';
import upcomingTasksActions from 'src/modules/widget/upcomingTasks/upcomingTasksActions';

const prefix = 'WIDGET_TASKS_ON_CALENDAR';

const tasksOnCalendarActions = {
  LOADING_STARTED: `${prefix}_LOADING_STARTED`,
  LOADING_SUCCESS: `${prefix}_LOADING_SUCCESS`,
  LOADING_ERROR: `${prefix}_LOADING_ERROR`,
  RESET: `${prefix}_RESET`,
  MORE_STARTED: `${prefix}_MORE_STARTED`,
  MORE_SUCCESS: `${prefix}_MORE_SUCCESS`,
  MORE_ERROR: `${prefix}_MORE_ERROR`,

  doReset: () => async (dispatch, getState) => {
    dispatch({
      type: tasksOnCalendarActions.RESET,
    });
  },

  doMore:
    (date, page, rpp = 5) =>
    async (dispatch, getState) => {
      try {
        if (
          !authSelectors.selectSignedIn(getState()) ||
          !AuthCurrentTenant.get()
        ) {
          return;
        }
        dispatch({
          type: tasksOnCalendarActions.MORE_STARTED,
        });

        const { tasks, totalPages } =
          await TasksOnCalendarService.more(
            date,
            page,
            rpp,
          );

        dispatch({
          type: tasksOnCalendarActions.MORE_SUCCESS,
          payload: {
            tasks: [
              ...tasksOnCalendarSelectors.selectTasks(
                getState(),
              ),
              ...tasks,
            ],
            totalPages,
          },
        });
      } catch (error) {
        Errors.handle(error);
        dispatch({
          type: tasksOnCalendarActions.MORE_ERROR,
        });
      }
    },

  doSearch:
    (info, successCallback, failureCallback) =>
    async (dispatch, getState) => {
      try {
        if (
          !authSelectors.selectSignedIn(getState()) ||
          !AuthCurrentTenant.get()
        ) {
          return;
        }

        dispatch({
          type: tasksOnCalendarActions.LOADING_STARTED,
        });

        const editable =
          taskSelectors.selectPermissionToEdit(getState());

        const { events, currentDate } =
          await TasksOnCalendarService.search(
            info.start,
            info.end,
          );

        const eventStyles = (event) => {
          let className = 'event-info';
          const dueDate = moment(event.dueDate).add(
            3,
            'days',
          );
          if (event.status === 'Complete') {
            className = 'event-success';
            const completedDate = moment(
              event.completedDate,
            );
            if (completedDate.isAfter(dueDate)) {
              className = 'event-success-not-in-time';
            } else if (
              !moment(event.dueDate).isSameOrAfter(
                completedDate,
                'day',
              )
            ) {
              className = 'event-success-overdue';
            }
          } else {
            const current = moment(currentDate);
            if (
              moment(event.dueDate).isAfter(current, 'day')
            ) {
              className = `event-${event.taskList[0].taskdisplaycolor}`;
            } else if (dueDate.isAfter(current, 'day')) {
              className = 'event-warning';
            } else {
              className = 'event-primary';
            }
          }
          return {
            className,
          };
        };

        const repeatText = (event) => {
          return event.repeat === 'Never'
            ? null
            : `(${event.repeat ?? ''})`;
        };

        const isEditable = (event) => {
          return (
            editable &&
            !(
              event.status === 'Complete' ||
              event.completeDate === null
            )
          );
        };

        successCallback(
          events.map((event) => ({
            // groupId: event.task._id,
            id: event._id,
            start: moment(
              getAbsoluteDateTimeByHour(event.dueDate),
            ).toISOString(),
            end: moment(
              getAbsoluteDateTimeByHour(event.dueDate),
            )
              .add(1, 'hour')
              .toISOString(),
            extendedProps: {
              title: event.title,
              repeat: repeatText(event),
            },
            title: [event.title, repeatText(event)]
              .join(' ')
              .trim(),
            editable: isEditable(event),
            durationEditable: false,
            ...eventStyles(event),
          })),
        );

        dispatch({
          type: tasksOnCalendarActions.LOADING_SUCCESS,
        });
      } catch (error) {
        failureCallback(error);
        Errors.handle(error);
        dispatch({
          type: tasksOnCalendarActions.LOADING_ERROR,
        });
      }
    },

  doMove:
    (info, calenderRef) => async (dispatch, getState) => {
      try {
        if (
          !authSelectors.selectSignedIn(getState()) ||
          !AuthCurrentTenant.get()
        ) {
          return;
        }

        dispatch({
          type: tasksOnCalendarActions.LOADING_STARTED,
        });

        if (await TasksOnCalendarService.move(info.event)) {
          dispatch(upcomingTasksActions.doRefresh());
          calenderRef.current.getApi().refetchEvents();
        } else {
          info.revert();
        }

        dispatch({
          type: tasksOnCalendarActions.LOADING_SUCCESS,
        });
      } catch (error) {
        Errors.handle(error);
        dispatch({
          type: tasksOnCalendarActions.LOADING_ERROR,
        });
      }
    },
};

export default tasksOnCalendarActions;
