import PolicyTemplateService from 'src/modules/policyTemplate/policyTemplateService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'POLICYTEMPLATE_FORM';

const policyTemplateFormActions = {
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
        type: policyTemplateFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await PolicyTemplateService.find(id);
      }

      dispatch({
        type: policyTemplateFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: policyTemplateFormActions.INIT_ERROR,
      });

      getHistory().push('/policy-template');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: policyTemplateFormActions.CREATE_STARTED,
      });

      await PolicyTemplateService.create(values);

      dispatch({
        type: policyTemplateFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.policyTemplate.create.success'),
      );

      getHistory().push('/policy-template');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: policyTemplateFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: policyTemplateFormActions.UPDATE_STARTED,
      });

      await PolicyTemplateService.update(id, values);

      dispatch({
        type: policyTemplateFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.policyTemplate.update.success'),
      );

      getHistory().push('/policy-template');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: policyTemplateFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default policyTemplateFormActions;
