import NewsArticleService from 'src/modules/newsArticle/newsArticleService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'NEWSARTICLE_VIEW';

const newsArticleViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: newsArticleViewActions.FIND_STARTED,
      });

      const record = await NewsArticleService.find(id);

      dispatch({
        type: newsArticleViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: newsArticleViewActions.FIND_ERROR,
      });

      getHistory().push('/news-article');
    }
  },
};

export default newsArticleViewActions;
