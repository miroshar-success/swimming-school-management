import NewsArticleService from 'src/modules/newsArticle/newsArticleService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'NEWSARTICLE_FORM';

const newsArticleFormActions = {
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
        type: newsArticleFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await NewsArticleService.find(id);
      }

      dispatch({
        type: newsArticleFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: newsArticleFormActions.INIT_ERROR,
      });

      getHistory().push('/news-article');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: newsArticleFormActions.CREATE_STARTED,
      });

      await NewsArticleService.create(values);

      dispatch({
        type: newsArticleFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.newsArticle.create.success'),
      );

      getHistory().push('/news-article');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: newsArticleFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: newsArticleFormActions.UPDATE_STARTED,
      });

      await NewsArticleService.update(id, values);

      dispatch({
        type: newsArticleFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.newsArticle.update.success'),
      );

      getHistory().push('/news-article');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: newsArticleFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default newsArticleFormActions;
