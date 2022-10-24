import listActions from 'src/modules/taskPriority/list/taskPriorityListActions';
import TaskPriorityService from 'src/modules/taskPriority/taskPriorityService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'TASKPRIORITY_DESTROY';

const taskPriorityDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: taskPriorityDestroyActions.DESTROY_STARTED,
      });

      await TaskPriorityService.destroyAll([id]);

      dispatch({
        type: taskPriorityDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.taskPriority.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/task-priority');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: taskPriorityDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: taskPriorityDestroyActions.DESTROY_ALL_STARTED,
      });

      await TaskPriorityService.destroyAll(ids);

      dispatch({
        type: taskPriorityDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.taskPriority.destroyAll.success'),
      );

      getHistory().push('/task-priority');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: taskPriorityDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default taskPriorityDestroyActions;
