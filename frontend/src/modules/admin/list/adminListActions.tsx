import AdminService from 'src/modules/admin/adminService';
import selectors from 'src/modules/admin/list/adminListSelectors';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { i18n } from 'src/i18n';
import exporterFields from 'src/modules/admin/list/adminListExporterFields';
import Exporter from 'src/modules/shared/exporter/exporter';

const prefix = 'ADMIN_LIST';

const adminListActions = {
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

  DESTROY_ALL_SELECTED_STARTED: `${prefix}_DESTROY_ALL_SELECTED_STARTED`,
  DESTROY_ALL_SELECTED_SUCCESS: `${prefix}_DESTROY_ALL_SELECTED_SUCCESS`,
  DESTROY_ALL_SELECTED_ERROR: `${prefix}_DESTROY_ALL_SELECTED_ERROR`,

  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  doClearAllSelected() {
    return {
      type: adminListActions.CLEAR_ALL_SELECTED,
    };
  },

  doToggleAllSelected() {
    return {
      type: adminListActions.TOGGLE_ALL_SELECTED,
    };
  },

  doToggleOneSelected(id) {
    return {
      type: adminListActions.TOGGLE_ONE_SELECTED,
      payload: id,
    };
  },

  doReset: () => async (dispatch) => {
    dispatch({
      type: adminListActions.RESETED,
    });

    dispatch(adminListActions.doFetch());
  },

  doExport: () => async (dispatch, getState) => {
    try {
      if (!exporterFields || !exporterFields.length) {
        throw new Error('exporterFields is required');
      }

      dispatch({
        type: adminListActions.EXPORT_STARTED,
      });

      const filter = selectors.selectFilter(getState());
      const response = await AdminService.fetchAdmins(
        { ...filter, export: 1 },
        selectors.selectOrderBy(getState()),
        null,
        null,
      );

      new Exporter(
        exporterFields,
        i18n('admin.exporterFileName'),
      ).transformAndExportAsExcelFile(response.rows);

      dispatch({
        type: adminListActions.EXPORT_SUCCESS,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: adminListActions.EXPORT_ERROR,
      });
    }
  },

  doChangePagination:
    (pagination) => async (dispatch, getState) => {
      dispatch({
        type: adminListActions.PAGINATION_CHANGED,
        payload: pagination,
      });

      dispatch(adminListActions.doFetchCurrentFilter());
    },

  doChangeSort: (sorter) => async (dispatch, getState) => {
    dispatch({
      type: adminListActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(adminListActions.doFetchCurrentFilter());
  },

  doFetchCurrentFilter:
    () => async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      const rawFilter = selectors.selectRawFilter(
        getState(),
      );
      dispatch(
        adminListActions.doFetch(filter, rawFilter, true),
      );
    },

  doFetch:
    (filter?, rawFilter?, keepPagination = true) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: adminListActions.FETCH_STARTED,
          payload: { filter, rawFilter, keepPagination },
        });

        const response = await AdminService.fetchAdmins(
          filter,
          selectors.selectOrderBy(getState()),
          selectors.selectLimit(getState()),
          selectors.selectOffset(getState()),
        );

        dispatch({
          type: adminListActions.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: adminListActions.FETCH_ERROR,
        });
      }
    },

  doDestroy: (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: adminListActions.DESTROY_STARTED,
      });

      await AdminService.destroy([id]);

      dispatch({
        type: adminListActions.DESTROY_SUCCESS,
      });

      Message.success(i18n('admin.doDestroySuccess'));

      dispatch(adminListActions.doFetchCurrentFilter());
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: adminListActions.DESTROY_ERROR,
      });

      dispatch(adminListActions.doFetchCurrentFilter());
    }
  },

  doDestroyAllSelected:
    () => async (dispatch, getState) => {
      try {
        const selectedRows = selectors.selectSelectedRows(
          getState(),
        );

        dispatch({
          type: adminListActions.DESTROY_ALL_SELECTED_STARTED,
        });

        await AdminService.destroy(
          selectedRows.map((row) => row.id),
        );

        dispatch({
          type: adminListActions.DESTROY_ALL_SELECTED_SUCCESS,
        });

        Message.success(
          i18n('admin.doDestroyAllSelectedSuccess'),
        );

        dispatch(adminListActions.doFetchCurrentFilter());
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: adminListActions.DESTROY_ALL_SELECTED_ERROR,
        });

        dispatch(adminListActions.doFetchCurrentFilter());
      }
    },
};

export default adminListActions;
