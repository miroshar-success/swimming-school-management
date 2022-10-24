import VendorCategoryService from 'src/modules/vendorCategory/vendorCategoryService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'VENDORCATEGORY_VIEW';

const vendorCategoryViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: vendorCategoryViewActions.FIND_STARTED,
      });

      const record = await VendorCategoryService.find(id);

      dispatch({
        type: vendorCategoryViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: vendorCategoryViewActions.FIND_ERROR,
      });

      getHistory().push('/vendor-category');
    }
  },
};

export default vendorCategoryViewActions;
