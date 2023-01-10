import PaymentService from 'src/modules/payment/paymentService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';
import studentListActions from 'src/modules/student/list/studentListActions';

const prefix = 'PAYMENT_DESTROY';

const paymentDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (paymentId) => async (dispatch) => {
    try {
      dispatch({
        type: paymentDestroyActions.DESTROY_STARTED,
      });

      await PaymentService.destroyAll([paymentId]);

      dispatch({
        type: paymentDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(i18n('payment.doDestroySuccess'));

      dispatch(studentListActions.doFetchCurrentFilter());
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: paymentDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (paymentIds) => async (dispatch) => {
    try {
      dispatch({
        type: paymentDestroyActions.DESTROY_ALL_STARTED,
      });

      await PaymentService.destroyAll(paymentIds);

      dispatch({
        type: paymentDestroyActions.DESTROY_ALL_SUCCESS,
      });

      Message.success(
        i18n('payment.doDestroyAllSelectedSuccess'),
      );

      getHistory().push('/admin/payment-history');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: paymentDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default paymentDestroyActions;
