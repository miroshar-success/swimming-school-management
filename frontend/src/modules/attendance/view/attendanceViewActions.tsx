import AttendanceService from 'src/modules/attendance/attendanceService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';
import { i18n } from 'src/i18n';

const prefix = 'ATTENDANCE_VIEW';

const attendanceViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: attendanceViewActions.FIND_STARTED,
      });

      const data = await AttendanceService.find(id);

      dispatch({
        type: attendanceViewActions.FIND_SUCCESS,
        payload: data,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: attendanceViewActions.FIND_ERROR,
      });
    }
  },

  doCreate: (id, lessonId) => async (dispatch) => {
    try {
      dispatch({
        type: attendanceViewActions.CREATE_STARTED,
      });

      await AttendanceService.create(id, lessonId);

      dispatch({
        type: attendanceViewActions.CREATE_SUCCESS,
      });

      Message.success(i18n('attendance.doAddSuccess'));
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: attendanceViewActions.CREATE_ERROR,
      });
    }
  },
};

export default attendanceViewActions;
