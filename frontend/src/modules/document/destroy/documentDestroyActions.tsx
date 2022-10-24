import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import DocumentService from 'src/modules/document/documentService';
import Errors from 'src/modules/shared/error/errors';
import listActions from 'src/modules/document/list/documentListActions';
import Message from 'src/view/shared/message';

const prefix = 'DOCUMENT_DESTROY';

const documentDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: documentDestroyActions.DESTROY_STARTED,
      });

      await DocumentService.destroyAll([id]);

      dispatch({
        type: documentDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.document.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/document');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: documentDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: documentDestroyActions.DESTROY_ALL_STARTED,
      });

      await DocumentService.destroyAll(ids);

      dispatch({
        type: documentDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.document.destroyAll.success'),
      );

      getHistory().push('/document');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: documentDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default documentDestroyActions;
