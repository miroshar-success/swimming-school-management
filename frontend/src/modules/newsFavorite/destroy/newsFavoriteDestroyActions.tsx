import listActions from 'src/modules/newsFavorite/list/newsFavoriteListActions';
import NewsFavoriteService from 'src/modules/newsFavorite/newsFavoriteService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'NEWSFAVORITE_DESTROY';

const newsFavoriteDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: newsFavoriteDestroyActions.DESTROY_STARTED,
      });

      await NewsFavoriteService.destroyAll([id]);

      dispatch({
        type: newsFavoriteDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.newsFavorite.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/news-favorite');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: newsFavoriteDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: newsFavoriteDestroyActions.DESTROY_ALL_STARTED,
      });

      await NewsFavoriteService.destroyAll(ids);

      dispatch({
        type: newsFavoriteDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.newsFavorite.destroyAll.success'),
      );

      getHistory().push('/news-favorite');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: newsFavoriteDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default newsFavoriteDestroyActions;
