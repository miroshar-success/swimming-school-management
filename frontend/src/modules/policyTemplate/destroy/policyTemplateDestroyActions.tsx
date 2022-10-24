import listActions from 'src/modules/policyTemplate/list/policyTemplateListActions';
import PolicyTemplateService from 'src/modules/policyTemplate/policyTemplateService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'POLICYTEMPLATE_DESTROY';

const policyTemplateDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: policyTemplateDestroyActions.DESTROY_STARTED,
      });

      await PolicyTemplateService.destroyAll([id]);

      dispatch({
        type: policyTemplateDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.policyTemplate.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/policy-template');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: policyTemplateDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: policyTemplateDestroyActions.DESTROY_ALL_STARTED,
      });

      await PolicyTemplateService.destroyAll(ids);

      dispatch({
        type: policyTemplateDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.policyTemplate.destroyAll.success'),
      );

      getHistory().push('/policy-template');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: policyTemplateDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default policyTemplateDestroyActions;
