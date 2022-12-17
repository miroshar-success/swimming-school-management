import AttendanceService from 'src/modules/attendance/attendanceService';
import { i18n } from 'src/i18n';
import Errors from 'src/modules/shared/error/errors';

const prefix = 'ATTENDANCE_LIST';

const attendanceListActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  doFetch: (filter?) => async (dispatch, getState) => {
    try {
      dispatch({
        type: attendanceListActions.FETCH_STARTED,
      });

      const response = await AttendanceService.list(filter);

      dispatch({
        type: attendanceListActions.FETCH_SUCCESS,
        payload: {
          lessons: response.result,
        },
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: attendanceListActions.FETCH_ERROR,
      });
    }
  },
};

export default attendanceListActions;
