import VendorService from 'src/modules/vendor/vendorService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'VENDOR_VIEW';

const vendorViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: vendorViewActions.FIND_STARTED,
      });

      const record = await VendorService.find(id);

      dispatch({
        type: vendorViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: vendorViewActions.FIND_ERROR,
      });

      getHistory().push('/vendor');
    }
  },
};

export default vendorViewActions;
