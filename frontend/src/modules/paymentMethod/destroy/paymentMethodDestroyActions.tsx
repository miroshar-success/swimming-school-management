import listActions from 'src/modules/paymentMethod/list/paymentMethodListActions';
import PaymentMethodService from 'src/modules/paymentMethod/paymentMethodService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'PAYMENTMETHOD_DESTROY';

const paymentMethodDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: paymentMethodDestroyActions.DESTROY_STARTED,
      });

      await PaymentMethodService.destroyAll([id]);

      dispatch({
        type: paymentMethodDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('payment.method.doDestroySuccess'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/admin/payment-method');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: paymentMethodDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: paymentMethodDestroyActions.DESTROY_ALL_STARTED,
      });

      await PaymentMethodService.destroyAll(ids);

      dispatch({
        type: paymentMethodDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('payment.method.doDestroyAllSelectedSuccess'),
      );

      getHistory().push('/admin/payment-method');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: paymentMethodDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default paymentMethodDestroyActions;
