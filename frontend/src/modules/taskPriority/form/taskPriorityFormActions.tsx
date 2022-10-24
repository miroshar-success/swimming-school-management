import TaskPriorityService from 'src/modules/taskPriority/taskPriorityService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'TASKPRIORITY_FORM';

const taskPriorityFormActions = {
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
        type: taskPriorityFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await TaskPriorityService.find(id);
      }

      dispatch({
        type: taskPriorityFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: taskPriorityFormActions.INIT_ERROR,
      });

      getHistory().push('/task-priority');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: taskPriorityFormActions.CREATE_STARTED,
      });

      await TaskPriorityService.create(values);

      dispatch({
        type: taskPriorityFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.taskPriority.create.success'),
      );

      getHistory().push('/task-priority');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: taskPriorityFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: taskPriorityFormActions.UPDATE_STARTED,
      });

      await TaskPriorityService.update(id, values);

      dispatch({
        type: taskPriorityFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.taskPriority.update.success'),
      );

      getHistory().push('/task-priority');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: taskPriorityFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default taskPriorityFormActions;
