import listActions from 'src/modules/risk/list/riskListActions';
import RiskService from 'src/modules/risk/riskService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'RISK_DESTROY';

const riskDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: riskDestroyActions.DESTROY_STARTED,
      });

      await RiskService.destroyAll([id]);

      dispatch({
        type: riskDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.risk.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/risk');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: riskDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: riskDestroyActions.DESTROY_ALL_STARTED,
      });

      await RiskService.destroyAll(ids);

      dispatch({
        type: riskDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.risk.destroyAll.success'),
      );

      getHistory().push('/risk');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: riskDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default riskDestroyActions;
