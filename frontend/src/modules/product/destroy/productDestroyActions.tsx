import listActions from 'src/modules/product/list/productListActions';
import ProductService from 'src/modules/product/productService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'PRODUCT_DESTROY';

const productDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: productDestroyActions.DESTROY_STARTED,
      });

      await ProductService.destroyAll([id]);

      dispatch({
        type: productDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.product.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/product');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: productDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: productDestroyActions.DESTROY_ALL_STARTED,
      });

      await ProductService.destroyAll(ids);

      dispatch({
        type: productDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.product.destroyAll.success'),
      );

      getHistory().push('/product');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: productDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default productDestroyActions;
