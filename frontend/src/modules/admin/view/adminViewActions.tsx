import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';
import AdminService from 'src/modules/admin/adminService';

const prefix = 'ADMIN_VIEW';

const adminViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: adminViewActions.FIND_STARTED,
      });

      const admin = await AdminService.find(id);

      dispatch({
        type: adminViewActions.FIND_SUCCESS,
        payload: admin,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: adminViewActions.FIND_ERROR,
      });

      getHistory().push('/admin');
    }
  },
};

export default adminViewActions;
