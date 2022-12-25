import PaymentMethodService from 'src/modules/paymentMethod/paymentMethodService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'PAYMENTMETHOD_FORM';

const paymentMethodFormActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  doInit: (id) => async (dispatch) => {
    try {
      dispatch({
        type: paymentMethodFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await PaymentMethodService.find(id);
      }

      dispatch({
        type: paymentMethodFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: paymentMethodFormActions.INIT_ERROR,
      });

      getHistory().push('/payment-method');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: paymentMethodFormActions.CREATE_STARTED,
      });

      await PaymentMethodService.create(values);

      dispatch({
        type: paymentMethodFormActions.CREATE_SUCCESS,
      });

      Message.success(i18n('payment.method.doAddSuccess'));

      getHistory().push('/payment-method');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: paymentMethodFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: paymentMethodFormActions.UPDATE_STARTED,
      });

      await PaymentMethodService.update(id, values);

      dispatch({
        type: paymentMethodFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('payment.method.doUpdateSuccess'),
      );

      getHistory().push('/payment-method');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: paymentMethodFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default paymentMethodFormActions;
