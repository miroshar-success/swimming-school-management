import Errors from 'src/modules/shared/error/errors';
import TotalStudentsByAgeService from 'src/modules/widget/totalStudentsByAge/totalStudentsByAgeService';

const prefix = 'WIDGET_TOTAL_STUDENTS_BY_AGE';

const totalStudentsByAgeActions = {
  LOADING_STARTED: `${prefix}_LOADING_STARTED`,
  LOADING_SUCCESS: `${prefix}_LOADING_SUCCESS`,
  LOADING_ERROR: `${prefix}_LOADING_ERROR`,
  RESET: `${prefix}_RESET`,

  doReset: () => async (dispatch, getState) => {
    dispatch({
      type: totalStudentsByAgeActions.RESET,
    });
  },

  doList: () => async (dispatch, getState) => {
    try {
      dispatch({
        type: totalStudentsByAgeActions.LOADING_STARTED,
      });

      const total = await TotalStudentsByAgeService.list();

      dispatch({
        type: totalStudentsByAgeActions.LOADING_SUCCESS,
        payload: total,
      });
    } catch (error) {
      Errors.handle(error);
      dispatch({
        type: totalStudentsByAgeActions.LOADING_ERROR,
      });
    }
  },
};

export default totalStudentsByAgeActions;
