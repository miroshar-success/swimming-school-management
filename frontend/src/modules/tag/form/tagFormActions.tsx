import TagService from 'src/modules/tag/tagService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'TAG_FORM';

const tagFormActions = {
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
        type: tagFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await TagService.find(id);
      }

      dispatch({
        type: tagFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: tagFormActions.INIT_ERROR,
      });

      getHistory().push('/tag');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: tagFormActions.CREATE_STARTED,
      });

      await TagService.create(values);

      dispatch({
        type: tagFormActions.CREATE_SUCCESS,
      });

      Message.success(i18n('entities.tag.create.success'));

      getHistory().push('/tag');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: tagFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: tagFormActions.UPDATE_STARTED,
      });

      await TagService.update(id, values);

      dispatch({
        type: tagFormActions.UPDATE_SUCCESS,
      });

      Message.success(i18n('entities.tag.update.success'));

      getHistory().push('/tag');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: tagFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default tagFormActions;
