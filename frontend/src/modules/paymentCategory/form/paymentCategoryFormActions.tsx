import PaymentCategoryService from 'src/modules/paymentCategory/paymentCategoryService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'PAYMENTCATEGORY_FORM';

const paymentCategoryFormActions = {
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
        type: paymentCategoryFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await PaymentCategoryService.find(id);
      }

      dispatch({
        type: paymentCategoryFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: paymentCategoryFormActions.INIT_ERROR,
      });

      getHistory().push('/payment-category');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: paymentCategoryFormActions.CREATE_STARTED,
      });

      await PaymentCategoryService.create(values);

      dispatch({
        type: paymentCategoryFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('paymentCategory.create.success'),
      );

      getHistory().push('/payment-category');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: paymentCategoryFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: paymentCategoryFormActions.UPDATE_STARTED,
      });

      await PaymentCategoryService.update(id, values);

      dispatch({
        type: paymentCategoryFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('paymentCategory.update.success'),
      );

      getHistory().push('/payment-category');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: paymentCategoryFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default paymentCategoryFormActions;
