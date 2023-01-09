import Errors from 'src/modules/shared/error/errors';
import TotalUsersService from 'src/modules/widget/totalUsers/totalUsersService';

const prefix = 'WIDGET_TOTAL_USERS';

const totalUsersActions = {
  GET_TOTAL_STUDENTS_STARTED: `${prefix}_GET_TOTAL_STUDENTS_STARTED`,
  GET_TOTAL_STUDENTS_SUCCESS: `${prefix}_GET_TOTAL_STUDENTS_SUCCESS`,
  GET_TOTAL_STUDENTS_ERROR: `${prefix}_GET_TOTAL_STUDENTS_ERROR`,

  GET_TOTAL_TEACHERS_STARTED: `${prefix}_GET_TOTAL_TEACHERS_STARTED`,
  GET_TOTAL_TEACHERS_SUCCESS: `${prefix}_GET_TOTAL_TEACHERS_SUCCESS`,
  GET_TOTAL_TEACHERS_ERROR: `${prefix}_GET_TOTAL_TEACHERS_ERROR`,

  GET_TOTAL_MANAGERS_STARTED: `${prefix}_GET_TOTAL_MANAGERS_STARTED`,
  GET_TOTAL_MANAGERS_SUCCESS: `${prefix}_GET_TOTAL_MANAGERS_SUCCESS`,
  GET_TOTAL_MANAGERS_ERROR: `${prefix}_GET_TOTAL_MANAGERS_ERROR`,

  GET_TOTAL_USERS_STARTED: `${prefix}_GET_TOTAL_USERS_STARTED`,
  GET_TOTAL_USERS_SUCCESS: `${prefix}_GET_TOTAL_USERS_SUCCESS`,
  GET_TOTAL_USERS_ERROR: `${prefix}_GET_TOTAL_USERS_ERROR`,
  RESET: `${prefix}_RESET`,

  doReset: () => async (dispatch, getState) => {
    dispatch({
      type: totalUsersActions.RESET,
    });
  },

  doGetTotalStudents: () => async (dispatch, getState) => {
    try {
      dispatch({
        type: totalUsersActions.GET_TOTAL_STUDENTS_STARTED,
      });

      const total = await TotalUsersService.totalStudents();

      dispatch({
        type: totalUsersActions.GET_TOTAL_STUDENTS_SUCCESS,
        payload: total.total,
      });
    } catch (error) {
      Errors.handle(error);
      dispatch({
        type: totalUsersActions.GET_TOTAL_STUDENTS_ERROR,
      });
    }
  },

  doGetTotalTeachers: () => async (dispatch, getState) => {
    try {
      dispatch({
        type: totalUsersActions.GET_TOTAL_TEACHERS_STARTED,
      });

      const total = await TotalUsersService.totalTeachers();

      dispatch({
        type: totalUsersActions.GET_TOTAL_TEACHERS_SUCCESS,
        payload: total.total,
      });
    } catch (error) {
      Errors.handle(error);
      dispatch({
        type: totalUsersActions.GET_TOTAL_TEACHERS_ERROR,
      });
    }
  },

  doGetTotalManagers: () => async (dispatch, getState) => {
    try {
      dispatch({
        type: totalUsersActions.GET_TOTAL_MANAGERS_STARTED,
      });

      const total = await TotalUsersService.totalManagers();

      dispatch({
        type: totalUsersActions.GET_TOTAL_MANAGERS_SUCCESS,
        payload: total.total,
      });
    } catch (error) {
      Errors.handle(error);
      dispatch({
        type: totalUsersActions.GET_TOTAL_MANAGERS_ERROR,
      });
    }
  },

  doGetTotalUsers: () => async (dispatch, getState) => {
    try {
      dispatch({
        type: totalUsersActions.GET_TOTAL_USERS_STARTED,
      });

      const total = await TotalUsersService.totalUsers();

      dispatch({
        type: totalUsersActions.GET_TOTAL_USERS_SUCCESS,
        payload: total.total,
      });
    } catch (error) {
      Errors.handle(error);
      dispatch({
        type: totalUsersActions.GET_TOTAL_USERS_ERROR,
      });
    }
  },
};

export default totalUsersActions;
