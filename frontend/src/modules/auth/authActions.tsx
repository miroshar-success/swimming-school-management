import { AuthToken } from 'src/modules/auth/authToken';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import { tenantSubdomain } from '../tenant/tenantSubdomain';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import muiActions from 'src/modules/mui/muiActions';
import selectors from 'src/modules/auth/authSelectors';
import service from 'src/modules/auth/authService';

const prefix = 'AUTH';

const authActions = {
  ERROR_MESSAGE_CLEARED: `${prefix}_ERROR_MESSAGE_CLEARED`,

  AUTH_INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  AUTH_INIT_ERROR: `${prefix}_INIT_ERROR`,

  AUTH_START: `${prefix}_START`,
  AUTH_SUCCESS: `${prefix}_SUCCESS`,
  AUTH_ERROR: `${prefix}_ERROR`,

  UPDATE_PROFILE_START: `${prefix}_UPDATE_PROFILE_START`,
  UPDATE_PROFILE_SUCCESS: `${prefix}_UPDATE_PROFILE_SUCCESS`,
  UPDATE_PROFILE_ERROR: `${prefix}_UPDATE_PROFILE_ERROR`,

  PASSWORD_CHANGE_START: `${prefix}_PASSWORD_CHANGE_START`,
  PASSWORD_CHANGE_SUCCESS: `${prefix}_PASSWORD_CHANGE_SUCCESS`,
  PASSWORD_CHANGE_ERROR: `${prefix}_PASSWORD_CHANGE_ERROR`,

  CURRENT_USER_REFRESH_START: `${prefix}_CURRENT_USER_REFRESH_START`,
  CURRENT_USER_REFRESH_SUCCESS: `${prefix}_CURRENT_USER_REFRESH_SUCCESS`,
  CURRENT_USER_REFRESH_ERROR: `${prefix}_CURRENT_USER_REFRESH_ERROR`,

  PASSWORD_RESET_EMAIL_START: `${prefix}_PASSWORD_RESET_EMAIL_START`,
  PASSWORD_RESET_EMAIL_SUCCESS: `${prefix}_PASSWORD_RESET_EMAIL_SUCCESS`,
  PASSWORD_RESET_EMAIL_ERROR: `${prefix}_PASSWORD_RESET_EMAIL_ERROR`,

  PASSWORD_RESET_START: `${prefix}_PASSWORD_RESET_START`,
  PASSWORD_RESET_SUCCESS: `${prefix}_PASSWORD_RESET_SUCCESS`,
  PASSWORD_RESET_ERROR: `${prefix}_PASSWORD_RESET_ERROR`,

  EMAIL_VERIFY_START: `${prefix}_EMAIL_VERIFY_START`,
  EMAIL_VERIFY_SUCCESS: `${prefix}_EMAIL_VERIFY_SUCCESS`,
  EMAIL_VERIFY_ERROR: `${prefix}_EMAIL_VERIFY_ERROR`,

  EMAIL_CONFIRMATION_START: `${prefix}_EMAIL_CONFIRMATION_START`,
  EMAIL_CONFIRMATION_SUCCESS: `${prefix}_EMAIL_CONFIRMATION_SUCCESS`,
  EMAIL_CONFIRMATION_ERROR: `${prefix}_EMAIL_CONFIRMATION_ERROR`,

  doClearErrorMessage() {
    return {
      type: authActions.ERROR_MESSAGE_CLEARED,
    };
  },

  doSendEmailConfirmation:
    () => async (dispatch, getState) => {
      try {
        dispatch({
          type: authActions.EMAIL_CONFIRMATION_START,
        });
        await service.sendEmailVerification();
        Message.success(
          i18n('auth.verificationEmailSuccess'),
        );
        dispatch({
          type: authActions.EMAIL_CONFIRMATION_SUCCESS,
        });
      } catch (error) {
        Errors.handle(error);
        dispatch({
          type: authActions.EMAIL_CONFIRMATION_ERROR,
        });
      }
    },

  doSendPasswordResetEmail: (email) => async (dispatch) => {
    try {
      dispatch({
        type: authActions.PASSWORD_RESET_EMAIL_START,
      });
      await service.sendPasswordResetEmail(email);
      Message.success(
        i18n('auth.passwordResetEmailSuccess'),
      );
      dispatch({
        type: authActions.PASSWORD_RESET_EMAIL_SUCCESS,
      });
    } catch (error) {
      Errors.handle(error);
      dispatch({
        type: authActions.PASSWORD_RESET_EMAIL_ERROR,
      });
    }
  },

  doRegisterEmailAndPassword:
    (email, password) => async (dispatch) => {
      try {
        dispatch({ type: authActions.AUTH_START });

        const token =
          await service.registerWithEmailAndPassword(
            email,
            password,
          );

        AuthToken.set(token, true);

        const currentUser = await service.fetchMe();

        dispatch({
          type: authActions.AUTH_SUCCESS,
          payload: {
            currentUser,
          },
        });
      } catch (error) {
        await service.signout();

        if (Errors.errorCode(error) !== 400) {
          Errors.handle(error);
        }

        dispatch({
          type: authActions.AUTH_ERROR,
          payload: Errors.selectMessage(error),
        });
      }
    },

  doRegisterData: (data) => async (dispatch) => {
    try {
      dispatch({ type: authActions.AUTH_START });

      const token = await service.registerWithData(data);

      AuthToken.set(token, true);

      const currentUser = await service.fetchMe();

      dispatch({
        type: authActions.AUTH_SUCCESS,
        payload: {
          currentUser,
        },
      });
    } catch (error) {
      await service.signout();

      if (Errors.errorCode(error) !== 400) {
        Errors.handle(error);
      }

      dispatch({
        type: authActions.AUTH_ERROR,
        payload: Errors.selectMessage(error),
      });
    }
  },

  doSigninWithEmailAndPassword:
    (email, password, rememberMe) => async (dispatch) => {
      try {
        dispatch({ type: authActions.AUTH_START });

        let currentUser = null;

        const token =
          await service.signinWithEmailAndPassword(
            email,
            password,
          );

        AuthToken.set(token, rememberMe);
        currentUser = await service.fetchMe();

        dispatch({
          type: authActions.AUTH_SUCCESS,
          payload: {
            currentUser,
          },
        });

        dispatch(muiActions.doInit());
      } catch (error) {
        await service.signout();

        if (Errors.errorCode(error) !== 400) {
          Errors.handle(error);
        }

        dispatch({
          type: authActions.AUTH_ERROR,
          payload: Errors.selectMessage(error),
        });
      }
    },

  doSignout: () => async (dispatch) => {
    try {
      dispatch({ type: authActions.AUTH_START });
      await service.signout();

      dispatch({
        type: authActions.AUTH_SUCCESS,
        payload: {
          currentUser: null,
        },
      });

      dispatch({
        type: muiActions.INIT_RESET,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: authActions.AUTH_ERROR,
      });
    }
  },

  doInit: () => async (dispatch) => {
    try {
      const token = AuthToken.get();
      let currentUser = null;

      if (token) {
        currentUser = await service.fetchMe();
      }

      dispatch({
        type: authActions.AUTH_INIT_SUCCESS,
        payload: {
          currentUser,
        },
      });
      dispatch(muiActions.doInit());
    } catch (error) {
      service.signout();
      Errors.handle(error);

      dispatch({
        type: authActions.AUTH_INIT_ERROR,
        payload: error,
      });
    }
  },

  doRefreshCurrentUser: () => async (dispatch) => {
    try {
      dispatch({
        type: authActions.CURRENT_USER_REFRESH_START,
      });

      let currentUser = null;
      const token = AuthToken.get();

      if (token) {
        currentUser = await service.fetchMe();
      }

      dispatch({
        type: authActions.CURRENT_USER_REFRESH_SUCCESS,
        payload: {
          currentUser,
        },
      });
    } catch (error) {
      service.signout();
      Errors.handle(error);

      dispatch({
        type: authActions.CURRENT_USER_REFRESH_ERROR,
        payload: error,
      });
    }
  },

  doUpdateProfile: (data) => async (dispatch) => {
    try {
      dispatch({
        type: authActions.UPDATE_PROFILE_START,
      });

      await service.updateProfile(data);

      dispatch({
        type: authActions.UPDATE_PROFILE_SUCCESS,
      });
      await dispatch(authActions.doRefreshCurrentUser());
      Message.success(i18n('auth.profile.success'));
      // getHistory().push('/');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: authActions.UPDATE_PROFILE_ERROR,
      });
    }
  },

  doChangePassword:
    (oldPassword, newPassword) => async (dispatch) => {
      try {
        dispatch({
          type: authActions.PASSWORD_CHANGE_START,
        });

        await service.changePassword(
          oldPassword,
          newPassword,
        );

        dispatch({
          type: authActions.PASSWORD_CHANGE_SUCCESS,
        });
        await dispatch(authActions.doRefreshCurrentUser());
        Message.success(
          i18n('auth.passwordChange.success'),
        );
        getHistory().push('/');
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: authActions.PASSWORD_CHANGE_ERROR,
        });
      }
    },

  doVerifyEmail: (token) => async (dispatch, getState) => {
    try {
      const isLoading = selectors.selectLoadingVerifyEmail(
        getState(),
      );

      if (isLoading) {
        return;
      }

      dispatch({
        type: authActions.EMAIL_VERIFY_START,
      });

      await service.verifyEmail(token);

      await dispatch(authActions.doRefreshCurrentUser());

      dispatch({
        type: authActions.EMAIL_VERIFY_SUCCESS,
      });

      getHistory().push('/');
    } catch (error) {
      Errors.showMessage(error);
      dispatch({
        type: authActions.EMAIL_VERIFY_ERROR,
      });
      getHistory().push('/');
    }
  },

  doResetPassword:
    (token, password) => async (dispatch) => {
      try {
        dispatch({
          type: authActions.PASSWORD_RESET_START,
        });

        await service.passwordReset(token, password);

        Message.success(i18n('auth.passwordResetSuccess'));
        dispatch({
          type: authActions.PASSWORD_RESET_SUCCESS,
        });
        getHistory().push('/');
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: authActions.PASSWORD_RESET_ERROR,
        });

        dispatch(authActions.doSignout());
        getHistory().push('/');
      }
    },

  doSelectTenant: (tenant) => async (dispatch) => {
    if (tenantSubdomain.isEnabled) {
      tenantSubdomain.redirectAuthenticatedTo(tenant.url);
      return;
    }

    AuthCurrentTenant.set(tenant);
    await dispatch(authActions.doRefreshCurrentUser());
    getHistory().push('/');
  },
};

export default authActions;
