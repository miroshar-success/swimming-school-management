import RiskService from 'src/modules/risk/riskService';
import selectors from 'src/modules/risk/list/riskListSelectors';
import { i18n } from 'src/i18n';
import exporterFields from 'src/modules/risk/list/riskListExporterFields';
import Errors from 'src/modules/shared/error/errors';
import Exporter from 'src/modules/shared/exporter/exporter';

const prefix = 'RISK_LIST';

const riskListActions = {
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
      type: riskListActions.CLEAR_ALL_SELECTED,
    };
  },

  doToggleAllSelected() {
    return {
      type: riskListActions.TOGGLE_ALL_SELECTED,
    };
  },

  doToggleOneSelected(id) {
    return {
      type: riskListActions.TOGGLE_ONE_SELECTED,
      payload: id,
    };
  },

  doReset: (additionalFilters) => async (dispatch) => {
    dispatch({
      type: riskListActions.RESETED,
    });

    dispatch(
      riskListActions.doFetch(
        additionalFilters,
        additionalFilters,
        false,
      ),
    );
  },

  doExport: () => async (dispatch, getState) => {
    try {
      if (!exporterFields || !exporterFields.length) {
        throw new Error('exporterFields is required');
      }

      dispatch({
        type: riskListActions.EXPORT_STARTED,
      });

      const filter = selectors.selectFilter(getState());
      const response = await RiskService.list(
        { ...filter, export: 1 },
        selectors.selectOrderBy(getState()),
        null,
        null,
      );

      new Exporter(
        exporterFields,
        i18n('entities.risk.exporterFileName'),
      ).transformAndExportAsExcelFile(response.rows);

      dispatch({
        type: riskListActions.EXPORT_SUCCESS,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: riskListActions.EXPORT_ERROR,
      });
    }
  },

  doChangePagination:
    (pagination) => async (dispatch, getState) => {
      dispatch({
        type: riskListActions.PAGINATION_CHANGED,
        payload: pagination,
      });

      dispatch(riskListActions.doFetchCurrentFilter());
    },

  doChangeSort: (sorter) => async (dispatch, getState) => {
    dispatch({
      type: riskListActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(riskListActions.doFetchCurrentFilter());
  },

  doFetchCurrentFilter:
    () => async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      const rawFilter = selectors.selectRawFilter(
        getState(),
      );
      dispatch(
        riskListActions.doFetch(filter, rawFilter, true),
      );
    },

  doFetchOpenRisksOnly:
    () => async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      const rawFilter = selectors.selectRawFilter(
        getState(),
      );
      const openRisksOnly = 'true';
      dispatch(
        riskListActions.doFetch(
          {
            ...filter,
            openRisksOnly,
          },
          {
            ...rawFilter,
            openRisksOnly,
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
          type: riskListActions.FETCH_STARTED,
          payload: { filter, rawFilter, keepPagination },
        });

        const response = await RiskService.list(
          filter,
          selectors.selectOrderBy(getState()),
          selectors.selectLimit(getState()),
          selectors.selectOffset(getState()),
        );

        dispatch({
          type: riskListActions.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: riskListActions.FETCH_ERROR,
        });
      }
    },
};

export default riskListActions;
