import OrganizationProfileService from 'src/modules/organizationProfile/organizationProfileService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'ORGANIZATIONPROFILE_VIEW';

const organizationProfileViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: () => async (dispatch) => {
    try {
      dispatch({
        type: organizationProfileViewActions.FIND_STARTED,
      });

      const id = await OrganizationProfileService.id();

      if (!id) {
        getHistory().push('/organization-profile/new');
        return;
      }

      const record = await OrganizationProfileService.find(
        id,
      );

      dispatch({
        type: organizationProfileViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: organizationProfileViewActions.FIND_ERROR,
      });
    }
  },
};

export default organizationProfileViewActions;
