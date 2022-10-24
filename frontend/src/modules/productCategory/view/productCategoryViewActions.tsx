import ProductCategoryService from 'src/modules/productCategory/productCategoryService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'PRODUCTCATEGORY_VIEW';

const productCategoryViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: productCategoryViewActions.FIND_STARTED,
      });

      const record = await ProductCategoryService.find(id);

      dispatch({
        type: productCategoryViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: productCategoryViewActions.FIND_ERROR,
      });

      getHistory().push('/product-category');
    }
  },
};

export default productCategoryViewActions;
