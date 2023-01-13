import LessonService from 'src/modules/lesson/lessonService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'LESSON_VIEW';

const lessonViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: lessonViewActions.FIND_STARTED,
      });

      const record = await LessonService.find(id);

      dispatch({
        type: lessonViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: lessonViewActions.FIND_ERROR,
      });

      getHistory().push('/admin/lesson');
    }
  },
};

export default lessonViewActions;
