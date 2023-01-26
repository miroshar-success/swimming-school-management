import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import SchoolsService from 'src/modules/schools/schoolsService';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import authSelectors from 'src/modules/auth/authSelectors';
import authActions from 'src/modules/auth/authActions';
import { AuthToken } from 'src/modules/auth/authToken';
import AuthService from 'src/modules/auth/authService';

const prefix = 'SCHOOLS_REGISTER';

const schoolsRegisterActions = {
  ADD_STARTED: `${prefix}_ADD_STARTED`,
  ADD_SUCCESS: `${prefix}_ADD_SUCCESS`,
  ADD_ERROR: `${prefix}_ADD_ERROR`,

  doAdd: (values) => async (dispatch) => {
    try {
      dispatch({
        type: authActions.AUTH_START,
      });

      const token = await SchoolsService.create(values);

      AuthToken.set(token, true);

      const currentUser = await AuthService.fetchMe();

      dispatch({
        type: authActions.AUTH_SUCCESS,
        payload: {
          currentUser,
        },
      });
    } catch (error) {
      await AuthService.signout();

      if (Errors.errorCode(error) !== 400) {
        Errors.handle(error);
      }

      dispatch({
        type: authActions.AUTH_ERROR,
        payload: Errors.selectMessage(error),
      });
    }
  },
};

export default schoolsRegisterActions;
