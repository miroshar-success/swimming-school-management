import TaskPriorityService from 'src/modules/taskPriority/taskPriorityService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'TASKPRIORITY_VIEW';

const taskPriorityViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: taskPriorityViewActions.FIND_STARTED,
      });

      const record = await TaskPriorityService.find(id);

      dispatch({
        type: taskPriorityViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: taskPriorityViewActions.FIND_ERROR,
      });

      getHistory().push('/task-priority');
    }
  },
};

export default taskPriorityViewActions;
