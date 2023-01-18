import SchoolsService from 'src/modules/schools/schoolsService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'SCHOOLS_VIEW';

const schoolsViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: schoolsViewActions.FIND_STARTED,
      });

      const record = await SchoolsService.find(id);

      dispatch({
        type: schoolsViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: schoolsViewActions.FIND_ERROR,
      });

      getHistory().push('/schools');
    }
  },
};

export default schoolsViewActions;
