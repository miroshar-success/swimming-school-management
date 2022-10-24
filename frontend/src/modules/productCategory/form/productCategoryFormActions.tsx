import ProductCategoryService from 'src/modules/productCategory/productCategoryService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'PRODUCTCATEGORY_FORM';

const productCategoryFormActions = {
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
        type: productCategoryFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await ProductCategoryService.find(id);
      }

      dispatch({
        type: productCategoryFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: productCategoryFormActions.INIT_ERROR,
      });

      getHistory().push('/product-category');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: productCategoryFormActions.CREATE_STARTED,
      });

      await ProductCategoryService.create(values);

      dispatch({
        type: productCategoryFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.productCategory.create.success'),
      );

      getHistory().push('/product-category');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: productCategoryFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: productCategoryFormActions.UPDATE_STARTED,
      });

      await ProductCategoryService.update(id, values);

      dispatch({
        type: productCategoryFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.productCategory.update.success'),
      );

      getHistory().push('/product-category');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: productCategoryFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default productCategoryFormActions;
