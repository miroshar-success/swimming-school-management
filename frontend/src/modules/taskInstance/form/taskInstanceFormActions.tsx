import TaskInstanceService from 'src/modules/taskInstance/taskInstanceService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'TASK_INSTANCE_FORM';

const taskInstanceFormActions = {
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
        type: taskInstanceFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await TaskInstanceService.find(id);
      }

      dispatch({
        type: taskInstanceFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: taskInstanceFormActions.INIT_ERROR,
      });

      getHistory().push('/task');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: taskInstanceFormActions.CREATE_STARTED,
      });

      await TaskInstanceService.create(values);

      dispatch({
        type: taskInstanceFormActions.CREATE_SUCCESS,
      });

      Message.success(i18n('entities.task.create.success'));
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: taskInstanceFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: taskInstanceFormActions.UPDATE_STARTED,
      });

      await TaskInstanceService.update(id, values);

      dispatch({
        type: taskInstanceFormActions.UPDATE_SUCCESS,
      });

      Message.success(i18n('entities.task.update.success'));
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: taskInstanceFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default taskInstanceFormActions;
