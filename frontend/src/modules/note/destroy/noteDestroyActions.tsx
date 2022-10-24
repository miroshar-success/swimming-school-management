import listActions from 'src/modules/note/list/noteListActions';
import NoteService from 'src/modules/note/noteService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'NOTE_DESTROY';

const noteDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: noteDestroyActions.DESTROY_STARTED,
      });

      await NoteService.destroyAll([id]);

      dispatch({
        type: noteDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.note.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/note');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: noteDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: noteDestroyActions.DESTROY_ALL_STARTED,
      });

      await NoteService.destroyAll(ids);

      dispatch({
        type: noteDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.note.destroyAll.success'),
      );

      getHistory().push('/note');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: noteDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default noteDestroyActions;
