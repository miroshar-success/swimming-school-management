import TaskService from 'src/modules/task/taskService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'TASK_VIEW';

const taskViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: taskViewActions.FIND_STARTED,
      });

      const record = await TaskService.find(id);

      dispatch({
        type: taskViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: taskViewActions.FIND_ERROR,
      });

      getHistory().push('/task');
    }
  },
};

export default taskViewActions;
