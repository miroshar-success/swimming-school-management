import NewsFavoriteService from 'src/modules/newsFavorite/newsFavoriteService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'NEWSFAVORITE_FORM';

const newsFavoriteFormActions = {
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
        type: newsFavoriteFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await NewsFavoriteService.find(id);
      }

      dispatch({
        type: newsFavoriteFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: newsFavoriteFormActions.INIT_ERROR,
      });

      getHistory().push('/news-favorite');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: newsFavoriteFormActions.CREATE_STARTED,
      });

      await NewsFavoriteService.create(values);

      dispatch({
        type: newsFavoriteFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.newsFavorite.create.success'),
      );

      getHistory().push('/news-favorite');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: newsFavoriteFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: newsFavoriteFormActions.UPDATE_STARTED,
      });

      await NewsFavoriteService.update(id, values);

      dispatch({
        type: newsFavoriteFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.newsFavorite.update.success'),
      );

      getHistory().push('/news-favorite');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: newsFavoriteFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default newsFavoriteFormActions;
