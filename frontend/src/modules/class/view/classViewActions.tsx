import ClassService from 'src/modules/class/classService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'CLASS_VIEW';

const classViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: classViewActions.FIND_STARTED,
      });

      const record = await ClassService.find(id);

      dispatch({
        type: classViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: classViewActions.FIND_ERROR,
      });

      getHistory().push('/class');
    }
  },
};

export default classViewActions;
