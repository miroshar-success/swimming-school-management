import Errors from 'src/modules/shared/error/errors';
import TotalPaidStudentsPerMonthService from 'src/modules/widget/totalPaidStudentsPerMonth/totalPaidStudentsPerMonthService';

const prefix = 'WIDGET_TOTAL_PAID_STUDENTS_PER_MONTH';

const totalPaidStudentsPerMonthActions = {
  LOADING_STARTED: `${prefix}_LOADING_STARTED`,
  LOADING_SUCCESS: `${prefix}_LOADING_SUCCESS`,
  LOADING_ERROR: `${prefix}_LOADING_ERROR`,
  RESET: `${prefix}_RESET`,

  doReset: () => async (dispatch, getState) => {
    dispatch({
      type: totalPaidStudentsPerMonthActions.RESET,
    });
  },

  doList: () => async (dispatch, getState) => {
    try {
      dispatch({
        type: totalPaidStudentsPerMonthActions.LOADING_STARTED,
      });

      const total =
        await TotalPaidStudentsPerMonthService.list();

      dispatch({
        type: totalPaidStudentsPerMonthActions.LOADING_SUCCESS,
        payload: total,
      });
    } catch (error) {
      Errors.handle(error);
      dispatch({
        type: totalPaidStudentsPerMonthActions.LOADING_ERROR,
      });
    }
  },
};

export default totalPaidStudentsPerMonthActions;
