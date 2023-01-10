import DocumentService from 'src/modules/document/documentService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'DOCUMENT_VIEW';

const documentViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: documentViewActions.FIND_STARTED,
      });

      const record = await DocumentService.find(id);

      dispatch({
        type: documentViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: documentViewActions.FIND_ERROR,
      });

      getHistory().push('/admin/document');
    }
  },
};

export default documentViewActions;
