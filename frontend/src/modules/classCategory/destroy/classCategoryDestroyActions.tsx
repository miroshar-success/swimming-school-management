import listActions from 'src/modules/classCategory/list/classCategoryListActions';
import ClassCategoryService from 'src/modules/classCategory/classCategoryService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'CLASSCATEGORY_DESTROY';

const classCategoryDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: classCategoryDestroyActions.DESTROY_STARTED,
      });

      await ClassCategoryService.destroyAll([id]);

      dispatch({
        type: classCategoryDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('classCategory.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/class-category');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: classCategoryDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: classCategoryDestroyActions.DESTROY_ALL_STARTED,
      });

      await ClassCategoryService.destroyAll(ids);

      dispatch({
        type: classCategoryDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('classCategory.destroyAll.success'),
      );

      getHistory().push('/class-category');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: classCategoryDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default classCategoryDestroyActions;
