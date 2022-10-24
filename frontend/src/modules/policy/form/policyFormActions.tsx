import PolicyService from 'src/modules/policy/policyService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'POLICY_FORM';

const policyFormActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  doInit: (id) => async (dispatch) => {
    try {
      dispatch({
        type: policyFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await PolicyService.find(id);
      }

      dispatch({
        type: policyFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: policyFormActions.INIT_ERROR,
      });

      getHistory().push('/policy');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: policyFormActions.CREATE_STARTED,
      });

      await PolicyService.create(values);

      dispatch({
        type: policyFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.policy.create.success'),
      );

      getHistory().push('/policy');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: policyFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: policyFormActions.UPDATE_STARTED,
      });

      await PolicyService.update(id, values);

      dispatch({
        type: policyFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.policy.update.success'),
      );

      getHistory().push('/policy');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: policyFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default policyFormActions;
