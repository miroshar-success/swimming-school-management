import { getAbsoluteDateTimeByHour } from 'src/modules/utils';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';
import authSelectors from 'src/modules/auth/authSelectors';
import Errors from 'src/modules/shared/error/errors';
import moment from 'moment';
import lessonSelectors from 'src/modules/lesson/lessonSelectors';
import lessonsOnCalendarSelectors from 'src/modules/widget/lessonsOnCalendar/lessonsOnCalendarSelectors';
import LessonsOnCalendarService from 'src/modules/widget/lessonsOnCalendar/lessonsOnCalendarService';

const prefix = 'WIDGET_LESSONS_ON_CALENDAR';

const lessonsOnCalendarActions = {
  LOADING_STARTED: `${prefix}_LOADING_STARTED`,
  LOADING_SUCCESS: `${prefix}_LOADING_SUCCESS`,
  LOADING_ERROR: `${prefix}_LOADING_ERROR`,
  RESET: `${prefix}_RESET`,
  MORE_STARTED: `${prefix}_MORE_STARTED`,
  MORE_SUCCESS: `${prefix}_MORE_SUCCESS`,
  MORE_ERROR: `${prefix}_MORE_ERROR`,

  doReset: () => async (dispatch, getState) => {
    dispatch({
      type: lessonsOnCalendarActions.RESET,
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
          type: lessonsOnCalendarActions.MORE_STARTED,
        });

        const { lessons, totalPages } =
          await LessonsOnCalendarService.more(
            date,
            page,
            rpp,
          );

        dispatch({
          type: lessonsOnCalendarActions.MORE_SUCCESS,
          payload: {
            lessons: [
              ...lessonsOnCalendarSelectors.selectLessons(
                getState(),
              ),
              ...lessons,
            ],
            totalPages,
          },
        });
      } catch (error) {
        Errors.handle(error);
        dispatch({
          type: lessonsOnCalendarActions.MORE_ERROR,
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
          type: lessonsOnCalendarActions.LOADING_STARTED,
        });

        const { events, currentDate } =
          await LessonsOnCalendarService.search();

        successCallback(
          events.map((event) => ({
            // groupId: event.lesson._id,
            id: event._id,
            start: moment()
              .day(event.day)
              .set('hour', moment(event.time).hours())
              .set('minute', moment(event.time).minutes())
              .set('second', moment(event.time).seconds())
              .toISOString(),
            end: moment()
              .day(event.day)
              .set('hour', moment(event.time).hours())
              .set('minute', moment(event.time).minutes())
              .set('second', moment(event.time).seconds())
              .add('minutes', event.class?.duration)
              .toISOString(),
            extendedProps: {
              class: event.class,
            },
            title: [event.class?.name],
            editable: true,
            durationEditable: false,
            ...{ className: 'event-success' },
          })),
        );

        dispatch({
          type: lessonsOnCalendarActions.LOADING_SUCCESS,
        });
      } catch (error) {
        failureCallback(error);
        Errors.handle(error);
        dispatch({
          type: lessonsOnCalendarActions.LOADING_ERROR,
        });
      }
    },
};

export default lessonsOnCalendarActions;
