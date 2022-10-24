import listActions from 'src/modules/organizationProfile/list/organizationProfileListActions';
import OrganizationProfileService from 'src/modules/organizationProfile/organizationProfileService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'ORGANIZATIONPROFILE_DESTROY';

const organizationProfileDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: organizationProfileDestroyActions.DESTROY_STARTED,
      });

      await OrganizationProfileService.destroyAll([id]);

      dispatch({
        type: organizationProfileDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n(
          'entities.organizationProfile.destroy.success',
        ),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/organization-profile/new');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: organizationProfileDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: organizationProfileDestroyActions.DESTROY_ALL_STARTED,
      });

      await OrganizationProfileService.destroyAll(ids);

      dispatch({
        type: organizationProfileDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n(
          'entities.organizationProfile.destroyAll.success',
        ),
      );

      getHistory().push('/organization-profile');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: organizationProfileDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default organizationProfileDestroyActions;
