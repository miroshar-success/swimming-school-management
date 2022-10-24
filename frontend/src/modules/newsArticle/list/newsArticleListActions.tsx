import NewsArticleService from 'src/modules/newsArticle/newsArticleService';
import selectors from 'src/modules/newsArticle/list/newsArticleListSelectors';
import { i18n } from 'src/i18n';
import exporterFields from 'src/modules/newsArticle/list/newsArticleListExporterFields';
import Errors from 'src/modules/shared/error/errors';
import Exporter from 'src/modules/shared/exporter/exporter';

const prefix = 'NEWSARTICLE_LIST';

const newsArticleListActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  RESETED: `${prefix}_RESETED`,
  TOGGLE_ONE_SELECTED: `${prefix}_TOGGLE_ONE_SELECTED`,
  TOGGLE_ALL_SELECTED: `${prefix}_TOGGLE_ALL_SELECTED`,
  CLEAR_ALL_SELECTED: `${prefix}_CLEAR_ALL_SELECTED`,

  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,
  SORTER_CHANGED: `${prefix}_SORTER_CHANGED`,

  EXPORT_STARTED: `${prefix}_EXPORT_STARTED`,
  EXPORT_SUCCESS: `${prefix}_EXPORT_SUCCESS`,
  EXPORT_ERROR: `${prefix}_EXPORT_ERROR`,

  doClearAllSelected() {
    return {
      type: newsArticleListActions.CLEAR_ALL_SELECTED,
    };
  },

  doToggleAllSelected() {
    return {
      type: newsArticleListActions.TOGGLE_ALL_SELECTED,
    };
  },

  doToggleOneSelected(id) {
    return {
      type: newsArticleListActions.TOGGLE_ONE_SELECTED,
      payload: id,
    };
  },

  doReset: () => async (dispatch) => {
    dispatch({
      type: newsArticleListActions.RESETED,
    });

    dispatch(newsArticleListActions.doFetch());
  },

  doExport: () => async (dispatch, getState) => {
    try {
      if (!exporterFields || !exporterFields.length) {
        throw new Error('exporterFields is required');
      }

      dispatch({
        type: newsArticleListActions.EXPORT_STARTED,
      });

      const filter = selectors.selectFilter(getState());
      const response = await NewsArticleService.list(
        { ...filter, export: 1 },
        selectors.selectOrderBy(getState()),
        null,
        null,
      );

      new Exporter(
        exporterFields,
        i18n('entities.newsArticle.exporterFileName'),
      ).transformAndExportAsExcelFile(response.rows);

      dispatch({
        type: newsArticleListActions.EXPORT_SUCCESS,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: newsArticleListActions.EXPORT_ERROR,
      });
    }
  },

  doChangePagination:
    (pagination) => async (dispatch, getState) => {
      dispatch({
        type: newsArticleListActions.PAGINATION_CHANGED,
        payload: pagination,
      });

      dispatch(
        newsArticleListActions.doFetchCurrentFilter(),
      );
    },

  doChangeSort: (sorter) => async (dispatch, getState) => {
    dispatch({
      type: newsArticleListActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(newsArticleListActions.doFetchCurrentFilter());
  },

  doFetchCurrentFilter:
    () => async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      const rawFilter = selectors.selectRawFilter(
        getState(),
      );
      dispatch(
        newsArticleListActions.doFetch(
          filter,
          rawFilter,
          true,
        ),
      );
    },

  doFetchFavorites: () => async (dispatch, getState) => {
    const filter = selectors.selectFilter(getState());
    const rawFilter = selectors.selectRawFilter(getState());
    const favorites = filter?.favorites ? null : 'true';
    dispatch(
      newsArticleListActions.doFetch(
        {
          ...filter,
          favorites,
        },
        {
          ...rawFilter,
          favorites,
        },
        false,
      ),
    );
  },

  doFetch:
    (filter?, rawFilter?, keepPagination = true) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: newsArticleListActions.FETCH_STARTED,
          payload: { filter, rawFilter, keepPagination },
        });

        const response = await NewsArticleService.list(
          filter,
          selectors.selectOrderBy(getState()),
          selectors.selectLimit(getState()),
          selectors.selectOffset(getState()),
        );

        dispatch({
          type: newsArticleListActions.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: newsArticleListActions.FETCH_ERROR,
        });
      }
    },
};

export default newsArticleListActions;
