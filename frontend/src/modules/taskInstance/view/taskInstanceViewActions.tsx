import TaskInstanceService from 'src/modules/taskInstance/taskInstanceService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'TASK_INSTANCE_VIEW';

const taskInstanceViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: taskInstanceViewActions.FIND_STARTED,
      });

      const record = await TaskInstanceService.find(id);

      dispatch({
        type: taskInstanceViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: taskInstanceViewActions.FIND_ERROR,
      });

      getHistory().push('/task');
    }
  },
};

export default taskInstanceViewActions;
