import ClassCategoryService from 'src/modules/classCategory/classCategoryService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'CLASSCATEGORY_FORM';

const classCategoryFormActions = {
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
        type: classCategoryFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await ClassCategoryService.find(id);
      }

      dispatch({
        type: classCategoryFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: classCategoryFormActions.INIT_ERROR,
      });

      getHistory().push('/class-category');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: classCategoryFormActions.CREATE_STARTED,
      });

      await ClassCategoryService.create(values);

      dispatch({
        type: classCategoryFormActions.CREATE_SUCCESS,
      });

      Message.success(i18n('classCategory.doAddSuccess'));

      getHistory().push('/class-category');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: classCategoryFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: classCategoryFormActions.UPDATE_STARTED,
      });

      await ClassCategoryService.update(id, values);

      dispatch({
        type: classCategoryFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('classCategory.doUpdateSuccess'),
      );

      getHistory().push('/class-category');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: classCategoryFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default classCategoryFormActions;
