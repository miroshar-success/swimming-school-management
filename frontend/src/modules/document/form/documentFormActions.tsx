import { i18n } from 'src/i18n';
import DocumentService from 'src/modules/document/documentService';
import documentListActions from 'src/modules/document/list/documentListActions';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';

const prefix = 'DOCUMENT_FORM';

const documentFormActions = {
  SAVE_STARTED: `${prefix}_SAVE_STARTED`,
  SAVE_SUCCESS: `${prefix}_SAVE_SUCCESS`,
  SAVE_ERROR: `${prefix}_SAVE_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  doSave:
    (values, fnSuccess = null) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: documentFormActions.SAVE_STARTED,
        });

        await DocumentService.save(values);

        dispatch({
          type: documentFormActions.SAVE_SUCCESS,
        });

        Message.success(
          i18n('entities.document.create.success'),
        );

        fnSuccess && fnSuccess();
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: documentFormActions.SAVE_ERROR,
        });
      }
    },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: documentFormActions.UPDATE_STARTED,
      });

      await DocumentService.update(id, values);

      dispatch({
        type: documentFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.document.update.success'),
      );

      dispatch(documentListActions.doFetchCurrentFilter());
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: documentFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default documentFormActions;
