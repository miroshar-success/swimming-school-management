import Errors from 'src/modules/shared/error/errors';
import TotalNewStudentsPerMonthService from 'src/modules/widget/totalNewStudentsPerMonth/totalNewStudentsPerMonthService';

const prefix = 'WIDGET_TOTAL_NEW_STUDENTS_PER_MONTH';

const totalNewStudentsPerMonthActions = {
  LOADING_STARTED: `${prefix}_LOADING_STARTED`,
  LOADING_SUCCESS: `${prefix}_LOADING_SUCCESS`,
  LOADING_ERROR: `${prefix}_LOADING_ERROR`,
  RESET: `${prefix}_RESET`,

  doReset: () => async (dispatch, getState) => {
    dispatch({
      type: totalNewStudentsPerMonthActions.RESET,
    });
  },

  doList: () => async (dispatch, getState) => {
    try {
      dispatch({
        type: totalNewStudentsPerMonthActions.LOADING_STARTED,
      });

      const total =
        await TotalNewStudentsPerMonthService.list();

      dispatch({
        type: totalNewStudentsPerMonthActions.LOADING_SUCCESS,
        payload: total,
      });
    } catch (error) {
      Errors.handle(error);
      dispatch({
        type: totalNewStudentsPerMonthActions.LOADING_ERROR,
      });
    }
  },
};

export default totalNewStudentsPerMonthActions;
