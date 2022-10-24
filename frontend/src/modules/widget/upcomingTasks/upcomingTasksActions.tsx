import Errors from 'src/modules/shared/error/errors';
import authSelectors from 'src/modules/auth/authSelectors';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';
import UpcomingTasksService from 'src/modules/widget/upcomingTasks/upcomingTasksService';

const prefix = 'WIDGET_INCOMING_TASKS';

const upcomingTasksActions = {
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
        type: upcomingTasksActions.INIT_STARTED,
      });

      const data = await UpcomingTasksService.get();

      dispatch({
        type: upcomingTasksActions.INIT_SUCCESS,
        payload: {
          data,
        },
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: upcomingTasksActions.INIT_ERROR,
      });
    }
  },

  doRefresh: () => async (dispatch, getState) => {
    dispatch(upcomingTasksActions.doInit());
  },
};

export default upcomingTasksActions;
