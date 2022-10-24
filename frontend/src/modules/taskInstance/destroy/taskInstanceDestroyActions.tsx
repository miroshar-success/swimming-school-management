import listActions from 'src/modules/taskInstance/list/taskInstanceListActions';
import TaskInstanceService from 'src/modules/taskInstance/taskInstanceService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'TASK_INSTANCE_DESTROY';

const taskInstanceDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: taskInstanceDestroyActions.DESTROY_STARTED,
      });

      await TaskInstanceService.destroyAll([id]);

      dispatch({
        type: taskInstanceDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.task.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: taskInstanceDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: taskInstanceDestroyActions.DESTROY_ALL_STARTED,
      });

      await TaskInstanceService.destroyAll(ids);

      dispatch({
        type: taskInstanceDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.task.destroyAll.success'),
      );
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: taskInstanceDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default taskInstanceDestroyActions;
