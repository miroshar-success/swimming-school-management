import OrganizationProfileService from 'src/modules/organizationProfile/organizationProfileService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'ORGANIZATIONPROFILE_FORM';

const organizationProfileFormActions = {
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
        type: organizationProfileFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await OrganizationProfileService.find(id);
      }

      dispatch({
        type: organizationProfileFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: organizationProfileFormActions.INIT_ERROR,
      });

      getHistory().push('/organization-profile');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: organizationProfileFormActions.CREATE_STARTED,
      });

      await OrganizationProfileService.create(values);

      dispatch({
        type: organizationProfileFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.organizationProfile.create.success'),
      );

      getHistory().push('/organization-profile');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: organizationProfileFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: organizationProfileFormActions.UPDATE_STARTED,
      });

      await OrganizationProfileService.update(id, values);

      dispatch({
        type: organizationProfileFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.organizationProfile.update.success'),
      );

      getHistory().push('/organization-profile');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: organizationProfileFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default organizationProfileFormActions;
