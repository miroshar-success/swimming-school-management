import PaymentService from 'src/modules/payment/paymentService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'LESSON_DESTROY';

const paymentDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (userId, paymentId) => async (dispatch) => {
    try {
      dispatch({
        type: paymentDestroyActions.DESTROY_STARTED,
      });

      await PaymentService.destroyAll(userId, [paymentId]);

      dispatch({
        type: paymentDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(i18n('payment.destroy.success'));

      getHistory().push('/payment');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: paymentDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll:
    (userId, paymentIds) => async (dispatch) => {
      try {
        dispatch({
          type: paymentDestroyActions.DESTROY_ALL_STARTED,
        });

        await PaymentService.destroyAll(userId, paymentIds);

        dispatch({
          type: paymentDestroyActions.DESTROY_ALL_SUCCESS,
        });

        Message.success(i18n('payment.destroyAll.success'));

        getHistory().push('/payment');
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: paymentDestroyActions.DESTROY_ALL_ERROR,
        });
      }
    },
};

export default paymentDestroyActions;
