import Errors from 'src/modules/shared/error/errors';
import TasksByMonthService from 'src/modules/widget/tasksByMonth/tasksByMonthService';
import authSelectors from 'src/modules/auth/authSelectors';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

const prefix = 'WIDGET_TASKS_BY_MONTH';

const tasksByMonthActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  doInit: () => async (dispatch, getState) => {
    try {
      if (
        !authSelectors.selectSignedIn(getState()) ||
        !AuthCurrentTenant.get()
      ) {
        return;
      }
      dispatch({
        type: tasksByMonthActions.INIT_STARTED,
      });

      const totalAmounts =
        await TasksByMonthService.totalAmounts();

      const lineChartDatasets =
        await TasksByMonthService.lineChartDatasets();

      dispatch({
        type: tasksByMonthActions.INIT_SUCCESS,
        payload: {
          totalAmounts,
          lineChartDatasets,
        },
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: tasksByMonthActions.INIT_ERROR,
      });
    }
  },

  doRefresh: () => async (dispatch, getState) => {
    dispatch(tasksByMonthActions.doInit());
  },
};

export default tasksByMonthActions;
