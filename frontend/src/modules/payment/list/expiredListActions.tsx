import PaymentService from 'src/modules/payment/paymentService';
import selectors from 'src/modules/payment/list/expiredListSelectors';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { i18n } from 'src/i18n';
import exporterFields from 'src/modules/payment/list/expiredListExporterFields';
import Exporter from 'src/modules/shared/exporter/exporter';

const prefix = 'PAYMENT_LIST';

const expiredListActions = {
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
      type: expiredListActions.CLEAR_ALL_SELECTED,
    };
  },

  doToggleAllSelected() {
    return {
      type: expiredListActions.TOGGLE_ALL_SELECTED,
    };
  },

  doToggleOneSelected(id) {
    return {
      type: expiredListActions.TOGGLE_ONE_SELECTED,
      payload: id,
    };
  },

  doReset: () => async (dispatch) => {
    dispatch({
      type: expiredListActions.RESETED,
    });

    dispatch(expiredListActions.doFetch());
  },

  doExport: () => async (dispatch, getState) => {
    try {
      if (!exporterFields || !exporterFields.length) {
        throw new Error('exporterFields is required');
      }

      dispatch({
        type: expiredListActions.EXPORT_STARTED,
      });

      const filter = selectors.selectFilter(getState());
      const response =
        await PaymentService.fetchExpiredList(
          { ...filter, export: 1 },
          selectors.selectOrderBy(getState()),
          null,
          null,
        );

      new Exporter(
        exporterFields,
        i18n('expired.exporterFileName'),
      ).transformAndExportAsExcelFile(response.rows);

      dispatch({
        type: expiredListActions.EXPORT_SUCCESS,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: expiredListActions.EXPORT_ERROR,
      });
    }
  },

  doChangePagination:
    (pagination) => async (dispatch, getState) => {
      dispatch({
        type: expiredListActions.PAGINATION_CHANGED,
        payload: pagination,
      });

      dispatch(expiredListActions.doFetchCurrentFilter());
    },

  doChangeSort: (sorter) => async (dispatch, getState) => {
    dispatch({
      type: expiredListActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(expiredListActions.doFetchCurrentFilter());
  },

  doFetchCurrentFilter:
    () => async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      const rawFilter = selectors.selectRawFilter(
        getState(),
      );
      dispatch(
        expiredListActions.doFetch(filter, rawFilter, true),
      );
    },

  doFetch:
    (filter?, rawFilter?, keepPagination = true) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: expiredListActions.FETCH_STARTED,
          payload: { filter, rawFilter, keepPagination },
        });

        const response =
          await PaymentService.fetchExpiredList(
            filter,
            selectors.selectOrderBy(getState()),
            selectors.selectLimit(getState()),
            selectors.selectOffset(getState()),
          );

        dispatch({
          type: expiredListActions.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: expiredListActions.FETCH_ERROR,
        });
      }
    },
};

export default expiredListActions;
