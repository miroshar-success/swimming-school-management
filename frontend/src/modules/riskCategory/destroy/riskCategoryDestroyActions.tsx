import listActions from 'src/modules/riskCategory/list/riskCategoryListActions';
import RiskCategoryService from 'src/modules/riskCategory/riskCategoryService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'RISKCATEGORY_DESTROY';

const riskCategoryDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: riskCategoryDestroyActions.DESTROY_STARTED,
      });

      await RiskCategoryService.destroyAll([id]);

      dispatch({
        type: riskCategoryDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.riskCategory.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/risk-category');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: riskCategoryDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: riskCategoryDestroyActions.DESTROY_ALL_STARTED,
      });

      await RiskCategoryService.destroyAll(ids);

      dispatch({
        type: riskCategoryDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.riskCategory.destroyAll.success'),
      );

      getHistory().push('/risk-category');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: riskCategoryDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default riskCategoryDestroyActions;
