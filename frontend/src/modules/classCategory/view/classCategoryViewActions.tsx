import ClassCategoryService from 'src/modules/classCategory/classCategoryService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'CLASSCATEGORY_VIEW';

const classCategoryViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: classCategoryViewActions.FIND_STARTED,
      });

      const record = await ClassCategoryService.find(id);

      dispatch({
        type: classCategoryViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: classCategoryViewActions.FIND_ERROR,
      });

      getHistory().push('/admin/class-category');
    }
  },
};

export default classCategoryViewActions;
