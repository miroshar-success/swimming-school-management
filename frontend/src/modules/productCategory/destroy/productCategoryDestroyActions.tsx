import listActions from 'src/modules/productCategory/list/productCategoryListActions';
import ProductCategoryService from 'src/modules/productCategory/productCategoryService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'PRODUCTCATEGORY_DESTROY';

const productCategoryDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: productCategoryDestroyActions.DESTROY_STARTED,
      });

      await ProductCategoryService.destroyAll([id]);

      dispatch({
        type: productCategoryDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.productCategory.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/product-category');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: productCategoryDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: productCategoryDestroyActions.DESTROY_ALL_STARTED,
      });

      await ProductCategoryService.destroyAll(ids);

      dispatch({
        type: productCategoryDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.productCategory.destroyAll.success'),
      );

      getHistory().push('/product-category');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: productCategoryDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default productCategoryDestroyActions;
