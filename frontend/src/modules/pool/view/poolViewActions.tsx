import PoolService from 'src/modules/pool/poolService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'POOL_VIEW';

const poolViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: poolViewActions.FIND_STARTED,
      });

      const record = await PoolService.find(id);

      dispatch({
        type: poolViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: poolViewActions.FIND_ERROR,
      });

      getHistory().push('/pool');
    }
  },
};

export default poolViewActions;
