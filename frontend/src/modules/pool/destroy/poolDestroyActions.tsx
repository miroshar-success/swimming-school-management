import listActions from 'src/modules/pool/list/poolListActions';
import PoolService from 'src/modules/pool/poolService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'POOL_DESTROY';

const poolDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: poolDestroyActions.DESTROY_STARTED,
      });

      await PoolService.destroyAll([id]);

      dispatch({
        type: poolDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(i18n('pool.destroy.success'));

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/pool');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: poolDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: poolDestroyActions.DESTROY_ALL_STARTED,
      });

      await PoolService.destroyAll(ids);

      dispatch({
        type: poolDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(i18n('pool.destroyAll.success'));

      getHistory().push('/pool');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: poolDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default poolDestroyActions;
