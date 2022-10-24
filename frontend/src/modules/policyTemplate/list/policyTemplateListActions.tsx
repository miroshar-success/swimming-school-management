import PolicyTemplateService from 'src/modules/policyTemplate/policyTemplateService';
import selectors from 'src/modules/policyTemplate/list/policyTemplateListSelectors';
import { i18n } from 'src/i18n';
import exporterFields from 'src/modules/policyTemplate/list/policyTemplateListExporterFields';
import Errors from 'src/modules/shared/error/errors';
import Exporter from 'src/modules/shared/exporter/exporter';

const prefix = 'POLICYTEMPLATE_LIST';

const policyTemplateListActions = {
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
      type: policyTemplateListActions.CLEAR_ALL_SELECTED,
    };
  },

  doToggleAllSelected() {
    return {
      type: policyTemplateListActions.TOGGLE_ALL_SELECTED,
    };
  },

  doToggleOneSelected(id) {
    return {
      type: policyTemplateListActions.TOGGLE_ONE_SELECTED,
      payload: id,
    };
  },

  doReset: () => async (dispatch) => {
    dispatch({
      type: policyTemplateListActions.RESETED,
    });

    dispatch(policyTemplateListActions.doFetch());
  },

  doExport: () => async (dispatch, getState) => {
    try {
      if (!exporterFields || !exporterFields.length) {
        throw new Error('exporterFields is required');
      }

      dispatch({
        type: policyTemplateListActions.EXPORT_STARTED,
      });

      const filter = selectors.selectFilter(getState());
      const response = await PolicyTemplateService.list(
        filter,
        selectors.selectOrderBy(getState()),
        null,
        null,
      );

      new Exporter(
        exporterFields,
        i18n('entities.policyTemplate.exporterFileName'),
      ).transformAndExportAsExcelFile(response.rows);

      dispatch({
        type: policyTemplateListActions.EXPORT_SUCCESS,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: policyTemplateListActions.EXPORT_ERROR,
      });
    }
  },

  doChangePagination:
    (pagination) => async (dispatch, getState) => {
      dispatch({
        type: policyTemplateListActions.PAGINATION_CHANGED,
        payload: pagination,
      });

      dispatch(
        policyTemplateListActions.doFetchCurrentFilter(),
      );
    },

  doChangeSort: (sorter) => async (dispatch, getState) => {
    dispatch({
      type: policyTemplateListActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(
      policyTemplateListActions.doFetchCurrentFilter(),
    );
  },

  doFetchCurrentFilter:
    () => async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      const rawFilter = selectors.selectRawFilter(
        getState(),
      );
      dispatch(
        policyTemplateListActions.doFetch(
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
      policyTemplateListActions.doFetch(
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
    (filter?, rawFilter?, keepPagination = false) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: policyTemplateListActions.FETCH_STARTED,
          payload: { filter, rawFilter, keepPagination },
        });

        const response = await PolicyTemplateService.list(
          filter,
          selectors.selectOrderBy(getState()),
          selectors.selectLimit(getState()),
          selectors.selectOffset(getState()),
        );

        dispatch({
          type: policyTemplateListActions.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: policyTemplateListActions.FETCH_ERROR,
        });
      }
    },
};

export default policyTemplateListActions;
