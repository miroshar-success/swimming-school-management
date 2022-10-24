import NoteService from 'src/modules/note/noteService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'NOTE_FORM';

const noteFormActions = {
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
        type: noteFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await NoteService.find(id);
      }

      dispatch({
        type: noteFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: noteFormActions.INIT_ERROR,
      });

      getHistory().push('/note');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: noteFormActions.CREATE_STARTED,
      });

      await NoteService.create(values);

      dispatch({
        type: noteFormActions.CREATE_SUCCESS,
      });

      Message.success(i18n('entities.note.create.success'));

      getHistory().push('/note');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: noteFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: noteFormActions.UPDATE_STARTED,
      });

      await NoteService.update(id, values);

      dispatch({
        type: noteFormActions.UPDATE_SUCCESS,
      });

      Message.success(i18n('entities.note.update.success'));

      getHistory().push('/note');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: noteFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default noteFormActions;
