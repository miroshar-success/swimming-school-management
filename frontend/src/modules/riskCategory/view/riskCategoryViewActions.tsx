import RiskCategoryService from 'src/modules/riskCategory/riskCategoryService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'RISKCATEGORY_VIEW';

const riskCategoryViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: riskCategoryViewActions.FIND_STARTED,
      });

      const record = await RiskCategoryService.find(id);

      dispatch({
        type: riskCategoryViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: riskCategoryViewActions.FIND_ERROR,
      });

      getHistory().push('/risk-category');
    }
  },
};

export default riskCategoryViewActions;
