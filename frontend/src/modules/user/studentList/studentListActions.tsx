import UserService from 'src/modules/user/userService';
import selectors from 'src/modules/user/studentList/studentListSelectors';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { i18n } from 'src/i18n';
import exporterFields from 'src/modules/user/studentList/studentListExporterFields';
import Exporter from 'src/modules/shared/exporter/exporter';

const prefix = 'STUDENT_LIST';

const studentListActions = {
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
      type: studentListActions.CLEAR_ALL_SELECTED,
    };
  },

  doToggleAllSelected() {
    return {
      type: studentListActions.TOGGLE_ALL_SELECTED,
    };
  },

  doToggleOneSelected(id) {
    return {
      type: studentListActions.TOGGLE_ONE_SELECTED,
      payload: id,
    };
  },

  doReset: () => async (dispatch) => {
    dispatch({
      type: studentListActions.RESETED,
    });

    dispatch(studentListActions.doFetch());
  },

  doExport: () => async (dispatch, getState) => {
    try {
      if (!exporterFields || !exporterFields.length) {
        throw new Error('exporterFields is required');
      }

      dispatch({
        type: studentListActions.EXPORT_STARTED,
      });

      const filter = selectors.selectFilter(getState());
      const response = await UserService.fetchUsers(
        'student',
        { ...filter, export: 1 },
        selectors.selectOrderBy(getState()),
        null,
        null,
      );

      new Exporter(
        exporterFields,
        i18n('user.student.exporterFileName'),
      ).transformAndExportAsExcelFile(response.rows);

      dispatch({
        type: studentListActions.EXPORT_SUCCESS,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: studentListActions.EXPORT_ERROR,
      });
    }
  },

  doChangePagination:
    (pagination) => async (dispatch, getState) => {
      dispatch({
        type: studentListActions.PAGINATION_CHANGED,
        payload: pagination,
      });

      dispatch(studentListActions.doFetchCurrentFilter());
    },

  doChangeSort: (sorter) => async (dispatch, getState) => {
    dispatch({
      type: studentListActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(studentListActions.doFetchCurrentFilter());
  },

  doFetchCurrentFilter:
    () => async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      const rawFilter = selectors.selectRawFilter(
        getState(),
      );
      dispatch(
        studentListActions.doFetch(filter, rawFilter, true),
      );
    },

  doFetch:
    (filter?, rawFilter?, keepPagination = true) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: studentListActions.FETCH_STARTED,
          payload: { filter, rawFilter, keepPagination },
        });

        const response = await UserService.fetchUsers(
          'student',
          filter,
          selectors.selectOrderBy(getState()),
          selectors.selectLimit(getState()),
          selectors.selectOffset(getState()),
        );

        dispatch({
          type: studentListActions.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: studentListActions.FETCH_ERROR,
        });
      }
    },

  doDestroy: (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: studentListActions.DESTROY_STARTED,
      });

      await UserService.destroy([id]);

      dispatch({
        type: studentListActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('user.student.doDestroySuccess'),
      );

      dispatch(studentListActions.doFetchCurrentFilter());
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: studentListActions.DESTROY_ERROR,
      });

      dispatch(studentListActions.doFetchCurrentFilter());
    }
  },

  doDestroyAllSelected:
    () => async (dispatch, getState) => {
      try {
        const selectedRows = selectors.selectSelectedRows(
          getState(),
        );

        dispatch({
          type: studentListActions.DESTROY_ALL_SELECTED_STARTED,
        });

        await UserService.destroy(
          selectedRows.map((row) => row.id),
        );

        dispatch({
          type: studentListActions.DESTROY_ALL_SELECTED_SUCCESS,
        });

        Message.success(
          i18n('user.student.doDestroyAllSelectedSuccess'),
        );

        dispatch(studentListActions.doFetchCurrentFilter());
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: studentListActions.DESTROY_ALL_SELECTED_ERROR,
        });

        dispatch(studentListActions.doFetchCurrentFilter());
      }
    },
};

export default studentListActions;
