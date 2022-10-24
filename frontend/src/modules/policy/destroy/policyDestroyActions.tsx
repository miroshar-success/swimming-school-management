import listActions from 'src/modules/policy/list/policyListActions';
import PolicyService from 'src/modules/policy/policyService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'POLICY_DESTROY';

const policyDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: policyDestroyActions.DESTROY_STARTED,
      });

      await PolicyService.destroyAll([id]);

      dispatch({
        type: policyDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.policy.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/policy');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: policyDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: policyDestroyActions.DESTROY_ALL_STARTED,
      });

      await PolicyService.destroyAll(ids);

      dispatch({
        type: policyDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.policy.destroyAll.success'),
      );

      getHistory().push('/policy');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: policyDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default policyDestroyActions;
