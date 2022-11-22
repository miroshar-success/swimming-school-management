import listActions from 'src/modules/grade/list/gradeListActions';
import GradeService from 'src/modules/grade/gradeService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'GRADE_DESTROY';

const gradeDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: gradeDestroyActions.DESTROY_STARTED,
      });

      await GradeService.destroyAll([id]);

      dispatch({
        type: gradeDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(i18n('grade.destroy.success'));

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/grade');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: gradeDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: gradeDestroyActions.DESTROY_ALL_STARTED,
      });

      await GradeService.destroyAll(ids);

      dispatch({
        type: gradeDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(i18n('grade.destroyAll.success'));

      getHistory().push('/grade');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: gradeDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default gradeDestroyActions;
