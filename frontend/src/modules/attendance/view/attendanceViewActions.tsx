import AttendanceService from 'src/modules/attendance/attendanceService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'ATTENDANCE_VIEW';

const attendanceViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: attendanceViewActions.FIND_STARTED,
      });

      const students = await AttendanceService.find(id);

      dispatch({
        type: attendanceViewActions.FIND_SUCCESS,
        payload: students,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: attendanceViewActions.FIND_ERROR,
      });

      getHistory().push('/attendance');
    }
  },
};

export default attendanceViewActions;
