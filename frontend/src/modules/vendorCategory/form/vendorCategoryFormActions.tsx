import VendorCategoryService from 'src/modules/vendorCategory/vendorCategoryService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'VENDORCATEGORY_FORM';

const vendorCategoryFormActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  doInit: (id) => async (dispatch) => {
    try {
      dispatch({
        type: vendorCategoryFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await VendorCategoryService.find(id);
      }

      dispatch({
        type: vendorCategoryFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: vendorCategoryFormActions.INIT_ERROR,
      });

      getHistory().push('/vendor-category');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: vendorCategoryFormActions.CREATE_STARTED,
      });

      await VendorCategoryService.create(values);

      dispatch({
        type: vendorCategoryFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.vendorCategory.create.success'),
      );

      getHistory().push('/vendor-category');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: vendorCategoryFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: vendorCategoryFormActions.UPDATE_STARTED,
      });

      await VendorCategoryService.update(id, values);

      dispatch({
        type: vendorCategoryFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.vendorCategory.update.success'),
      );

      getHistory().push('/vendor-category');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: vendorCategoryFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default vendorCategoryFormActions;
