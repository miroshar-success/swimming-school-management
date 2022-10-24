import TaskListService from 'src/modules/taskList/taskListService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'TASKLIST_VIEW';

const taskListViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: taskListViewActions.FIND_STARTED,
      });

      const record = await TaskListService.find(id);

      dispatch({
        type: taskListViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: taskListViewActions.FIND_ERROR,
      });

      getHistory().push('/task-list');
    }
  },
};

export default taskListViewActions;
