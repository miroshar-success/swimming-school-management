import TeacherService from 'src/modules/teacher/teacherService';
import selectors from 'src/modules/teacher/list/teacherListSelectors';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { i18n } from 'src/i18n';
import exporterFields from 'src/modules/teacher/list/teacherListExporterFields';
import Exporter from 'src/modules/shared/exporter/exporter';

const prefix = 'TEACHER_LIST';

const teacherListActions = {
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
      type: teacherListActions.CLEAR_ALL_SELECTED,
    };
  },

  doToggleAllSelected() {
    return {
      type: teacherListActions.TOGGLE_ALL_SELECTED,
    };
  },

  doToggleOneSelected(id) {
    return {
      type: teacherListActions.TOGGLE_ONE_SELECTED,
      payload: id,
    };
  },

  doReset: () => async (dispatch) => {
    dispatch({
      type: teacherListActions.RESETED,
    });

    dispatch(teacherListActions.doFetch());
  },

  doExport: () => async (dispatch, getState) => {
    try {
      if (!exporterFields || !exporterFields.length) {
        throw new Error('exporterFields is required');
      }

      dispatch({
        type: teacherListActions.EXPORT_STARTED,
      });

      const filter = selectors.selectFilter(getState());
      const response = await TeacherService.fetchTeachers(
        { ...filter, export: 1 },
        selectors.selectOrderBy(getState()),
        null,
        null,
      );

      new Exporter(
        exporterFields,
        i18n('teacher.exporterFileName'),
      ).transformAndExportAsExcelFile(response.rows);

      dispatch({
        type: teacherListActions.EXPORT_SUCCESS,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: teacherListActions.EXPORT_ERROR,
      });
    }
  },

  doChangePagination:
    (pagination) => async (dispatch, getState) => {
      dispatch({
        type: teacherListActions.PAGINATION_CHANGED,
        payload: pagination,
      });

      dispatch(teacherListActions.doFetchCurrentFilter());
    },

  doChangeSort: (sorter) => async (dispatch, getState) => {
    dispatch({
      type: teacherListActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(teacherListActions.doFetchCurrentFilter());
  },

  doFetchCurrentFilter:
    () => async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      const rawFilter = selectors.selectRawFilter(
        getState(),
      );
      dispatch(
        teacherListActions.doFetch(filter, rawFilter, true),
      );
    },

  doFetch:
    (filter?, rawFilter?, keepPagination = true) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: teacherListActions.FETCH_STARTED,
          payload: { filter, rawFilter, keepPagination },
        });

        const response = await TeacherService.fetchTeachers(
          filter,
          selectors.selectOrderBy(getState()),
          selectors.selectLimit(getState()),
          selectors.selectOffset(getState()),
        );

        dispatch({
          type: teacherListActions.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: teacherListActions.FETCH_ERROR,
        });
      }
    },

  doDestroy: (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: teacherListActions.DESTROY_STARTED,
      });

      await TeacherService.destroy([id]);

      dispatch({
        type: teacherListActions.DESTROY_SUCCESS,
      });

      Message.success(i18n('teacher.doDestroySuccess'));

      dispatch(teacherListActions.doFetchCurrentFilter());
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: teacherListActions.DESTROY_ERROR,
      });

      dispatch(teacherListActions.doFetchCurrentFilter());
    }
  },

  doDestroyAllSelected:
    () => async (dispatch, getState) => {
      try {
        const selectedRows = selectors.selectSelectedRows(
          getState(),
        );

        dispatch({
          type: teacherListActions.DESTROY_ALL_SELECTED_STARTED,
        });

        await TeacherService.destroy(
          selectedRows.map((row) => row.id),
        );

        dispatch({
          type: teacherListActions.DESTROY_ALL_SELECTED_SUCCESS,
        });

        Message.success(
          i18n('teacher.doDestroyAllSelectedSuccess'),
        );

        dispatch(teacherListActions.doFetchCurrentFilter());
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: teacherListActions.DESTROY_ALL_SELECTED_ERROR,
        });

        dispatch(teacherListActions.doFetchCurrentFilter());
      }
    },
};

export default teacherListActions;
