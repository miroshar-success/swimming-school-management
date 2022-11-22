import GradeService from 'src/modules/grade/gradeService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'GRADE_VIEW';

const gradeViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: gradeViewActions.FIND_STARTED,
      });

      const record = await GradeService.find(id);

      dispatch({
        type: gradeViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: gradeViewActions.FIND_ERROR,
      });

      getHistory().push('/grade');
    }
  },
};

export default gradeViewActions;
