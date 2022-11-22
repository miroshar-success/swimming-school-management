import listActions from 'src/modules/lesson/list/lessonListActions';
import LessonService from 'src/modules/lesson/lessonService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'LESSON_DESTROY';

const lessonDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: lessonDestroyActions.DESTROY_STARTED,
      });

      await LessonService.destroyAll([id]);

      dispatch({
        type: lessonDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(i18n('lesson.destroy.success'));

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/lesson');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: lessonDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: lessonDestroyActions.DESTROY_ALL_STARTED,
      });

      await LessonService.destroyAll(ids);

      dispatch({
        type: lessonDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(i18n('lesson.destroyAll.success'));

      getHistory().push('/lesson');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: lessonDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default lessonDestroyActions;
