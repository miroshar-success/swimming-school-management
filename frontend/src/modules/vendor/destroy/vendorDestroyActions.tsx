import listActions from 'src/modules/vendor/list/vendorListActions';
import VendorService from 'src/modules/vendor/vendorService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'VENDOR_DESTROY';

const vendorDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: vendorDestroyActions.DESTROY_STARTED,
      });

      await VendorService.destroyAll([id]);

      dispatch({
        type: vendorDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.vendor.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/vendor');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: vendorDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: vendorDestroyActions.DESTROY_ALL_STARTED,
      });

      await VendorService.destroyAll(ids);

      dispatch({
        type: vendorDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.vendor.destroyAll.success'),
      );

      getHistory().push('/vendor');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: vendorDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default vendorDestroyActions;
