import Errors from 'src/modules/shared/error/errors';
import TotalPaymentPerMonthService from 'src/modules/widget/totalPaymentPerMonth/totalPaymentPerMonthService';

const prefix = 'WIDGET_TOTAL_PAYMENT_PER_MONTH';

const totalPaymentPerMonthActions = {
  LOADING_STARTED: `${prefix}_LOADING_STARTED`,
  LOADING_SUCCESS: `${prefix}_LOADING_SUCCESS`,
  LOADING_ERROR: `${prefix}_LOADING_ERROR`,
  RESET: `${prefix}_RESET`,

  doReset: () => async (dispatch, getState) => {
    dispatch({
      type: totalPaymentPerMonthActions.RESET,
    });
  },

  doList: () => async (dispatch, getState) => {
    try {
      dispatch({
        type: totalPaymentPerMonthActions.LOADING_STARTED,
      });

      const total =
        await TotalPaymentPerMonthService.list();

      dispatch({
        type: totalPaymentPerMonthActions.LOADING_SUCCESS,
        payload: total,
      });
    } catch (error) {
      Errors.handle(error);
      dispatch({
        type: totalPaymentPerMonthActions.LOADING_ERROR,
      });
    }
  },
};

export default totalPaymentPerMonthActions;
