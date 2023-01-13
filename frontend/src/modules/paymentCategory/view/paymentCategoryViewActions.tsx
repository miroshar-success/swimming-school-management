import PaymentCategoryService from 'src/modules/paymentCategory/paymentCategoryService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'PAYMENTCATEGORY_VIEW';

const paymentCategoryViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: paymentCategoryViewActions.FIND_STARTED,
      });

      const record = await PaymentCategoryService.find(id);

      dispatch({
        type: paymentCategoryViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: paymentCategoryViewActions.FIND_ERROR,
      });

      getHistory().push('/admin/payment-category');
    }
  },
};

export default paymentCategoryViewActions;
