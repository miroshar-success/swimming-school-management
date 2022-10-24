import listActions from 'src/modules/newsArticle/list/newsArticleListActions';
import NewsArticleService from 'src/modules/newsArticle/newsArticleService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'NEWSARTICLE_DESTROY';

const newsArticleDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: newsArticleDestroyActions.DESTROY_STARTED,
      });

      await NewsArticleService.destroyAll([id]);

      dispatch({
        type: newsArticleDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.newsArticle.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/news-article');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: newsArticleDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: newsArticleDestroyActions.DESTROY_ALL_STARTED,
      });

      await NewsArticleService.destroyAll(ids);

      dispatch({
        type: newsArticleDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.newsArticle.destroyAll.success'),
      );

      getHistory().push('/news-article');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: newsArticleDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default newsArticleDestroyActions;
