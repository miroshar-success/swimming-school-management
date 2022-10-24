import listActions from 'src/modules/vendorCategory/list/vendorCategoryListActions';
import VendorCategoryService from 'src/modules/vendorCategory/vendorCategoryService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'VENDORCATEGORY_DESTROY';

const vendorCategoryDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: vendorCategoryDestroyActions.DESTROY_STARTED,
      });

      await VendorCategoryService.destroyAll([id]);

      dispatch({
        type: vendorCategoryDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.vendorCategory.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/vendor-category');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: vendorCategoryDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: vendorCategoryDestroyActions.DESTROY_ALL_STARTED,
      });

      await VendorCategoryService.destroyAll(ids);

      dispatch({
        type: vendorCategoryDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.vendorCategory.destroyAll.success'),
      );

      getHistory().push('/vendor-category');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: vendorCategoryDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default vendorCategoryDestroyActions;
