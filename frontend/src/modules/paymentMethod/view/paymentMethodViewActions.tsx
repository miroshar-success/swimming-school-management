import PaymentMethodService from 'src/modules/paymentMethod/paymentMethodService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'PAYMENTMETHOD_VIEW';

const paymentMethodViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: paymentMethodViewActions.FIND_STARTED,
      });

      const record = await PaymentMethodService.find(id);

      dispatch({
        type: paymentMethodViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: paymentMethodViewActions.FIND_ERROR,
      });

      getHistory().push('/admin/payment-method');
    }
  },
};

export default paymentMethodViewActions;
