import TaskService from 'src/modules/task/taskService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'TASK_FORM';

const taskFormActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  doInit: (id) => async (dispatch) => {
    try {
      dispatch({
        type: taskFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await TaskService.find(id);
      }

      dispatch({
        type: taskFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: taskFormActions.INIT_ERROR,
      });

      getHistory().push('/task');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: taskFormActions.CREATE_STARTED,
      });

      await TaskService.create(values);

      dispatch({
        type: taskFormActions.CREATE_SUCCESS,
      });

      Message.success(i18n('entities.task.create.success'));

      getHistory().push('/task');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: taskFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: taskFormActions.UPDATE_STARTED,
      });

      await TaskService.update(id, values);

      dispatch({
        type: taskFormActions.UPDATE_SUCCESS,
      });

      Message.success(i18n('entities.task.update.success'));

      getHistory().push('/task');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: taskFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default taskFormActions;
