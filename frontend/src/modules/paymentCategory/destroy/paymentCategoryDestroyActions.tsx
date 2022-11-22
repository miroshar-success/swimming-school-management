import listActions from 'src/modules/paymentCategory/list/paymentCategoryListActions';
import PaymentCategoryService from 'src/modules/paymentCategory/paymentCategoryService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'PAYMENTCATEGORY_DESTROY';

const paymentCategoryDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: paymentCategoryDestroyActions.DESTROY_STARTED,
      });

      await PaymentCategoryService.destroyAll([id]);

      dispatch({
        type: paymentCategoryDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('paymentCategory.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/payment-category');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: paymentCategoryDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: paymentCategoryDestroyActions.DESTROY_ALL_STARTED,
      });

      await PaymentCategoryService.destroyAll(ids);

      dispatch({
        type: paymentCategoryDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('paymentCategory.destroyAll.success'),
      );

      getHistory().push('/payment-category');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: paymentCategoryDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default paymentCategoryDestroyActions;
