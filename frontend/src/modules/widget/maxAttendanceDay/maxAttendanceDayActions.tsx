import Errors from 'src/modules/shared/error/errors';
import MaxAttendanceDayService from 'src/modules/widget/maxAttendanceDay/maxAttendanceDayService';

const prefix = 'WIDGET_MAX_ATTENDANCE_DAY';

const maxAttendanceDayActions = {
  GET_STARTED: `${prefix}_GET_STARTED`,
  GET_SUCCESS: `${prefix}_GET_SUCCESS`,
  GET_ERROR: `${prefix}_GET_ERROR`,
  RESET: `${prefix}_RESET`,

  doReset: () => async (dispatch, getState) => {
    dispatch({
      type: maxAttendanceDayActions.RESET,
    });
  },

  doGetMaxAttendanceDay:
    () => async (dispatch, getState) => {
      try {
        dispatch({
          type: maxAttendanceDayActions.GET_STARTED,
        });

        const day =
          await MaxAttendanceDayService.getMaxAttendanceDay();

        dispatch({
          type: maxAttendanceDayActions.GET_SUCCESS,
          payload: day,
        });
      } catch (error) {
        Errors.handle(error);
        dispatch({
          type: maxAttendanceDayActions.GET_ERROR,
        });
      }
    },
};

export default maxAttendanceDayActions;
