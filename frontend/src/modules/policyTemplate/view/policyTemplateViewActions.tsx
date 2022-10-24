import PolicyTemplateService from 'src/modules/policyTemplate/policyTemplateService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'POLICYTEMPLATE_VIEW';

const policyTemplateViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: policyTemplateViewActions.FIND_STARTED,
      });

      const record = await PolicyTemplateService.find(id);

      dispatch({
        type: policyTemplateViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: policyTemplateViewActions.FIND_ERROR,
      });

      getHistory().push('/policy-template');
    }
  },
};

export default policyTemplateViewActions;
