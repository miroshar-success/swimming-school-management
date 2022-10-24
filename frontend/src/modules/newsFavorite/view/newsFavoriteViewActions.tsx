import NewsFavoriteService from 'src/modules/newsFavorite/newsFavoriteService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'NEWSFAVORITE_VIEW';

const newsFavoriteViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: newsFavoriteViewActions.FIND_STARTED,
      });

      const record = await NewsFavoriteService.find(id);

      dispatch({
        type: newsFavoriteViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: newsFavoriteViewActions.FIND_ERROR,
      });

      getHistory().push('/news-favorite');
    }
  },
};

export default newsFavoriteViewActions;
