import RiskService from 'src/modules/risk/riskService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'RISK_VIEW';

const riskViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: riskViewActions.FIND_STARTED,
      });

      const record = await RiskService.find(id);

      dispatch({
        type: riskViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: riskViewActions.FIND_ERROR,
      });

      getHistory().push('/risk');
    }
  },
};

export default riskViewActions;
