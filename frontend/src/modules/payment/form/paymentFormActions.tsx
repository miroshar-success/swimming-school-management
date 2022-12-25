import PaymentService from 'src/modules/payment/paymentService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'PAYMENT_FORM';

const paymentFormActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  doInit: () => async (dispatch) => {
    try {
      dispatch({
        type: paymentFormActions.INIT_STARTED,
      });

      let record = {};

      dispatch({
        type: paymentFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: paymentFormActions.INIT_ERROR,
      });

      getHistory().push('/payment');
    }
  },

  doCreate: (id, values) => async (dispatch) => {
    try {
      dispatch({
        type: paymentFormActions.CREATE_STARTED,
      });

      await PaymentService.create(id, values);

      dispatch({
        type: paymentFormActions.CREATE_SUCCESS,
      });

      Message.success(i18n('payment.doAddSuccess'));

      getHistory().push('/payment');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: paymentFormActions.CREATE_ERROR,
      });
    }
  },
};

export default paymentFormActions;
