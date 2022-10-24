import PolicyService from 'src/modules/policy/policyService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'POLICY_VIEW';

const policyViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: policyViewActions.FIND_STARTED,
      });

      const record = await PolicyService.find(id);

      dispatch({
        type: policyViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: policyViewActions.FIND_ERROR,
      });

      getHistory().push('/policy');
    }
  },
};

export default policyViewActions;
