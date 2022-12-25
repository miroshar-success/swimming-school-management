import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import registrationService from 'src/modules/registration/registrationService';

const prefix = 'REGISTRATION_FORM';

const registrationFormActions = {
  REGISTER_STARTED: `${prefix}_REGISTER_STARTED`,
  REGISTER_SUCCESS: `${prefix}_REGISTER_SUCCESS`,
  REGISTER_ERROR: `${prefix}_REGISTER_ERROR`,

  doRegisterLessons:
    (values) => async (dispatch, getState) => {
      try {
        dispatch({
          type: registrationFormActions.REGISTER_STARTED,
        });

        await registrationService.registrationLessons(
          values,
        );

        dispatch({
          type: registrationFormActions.REGISTER_SUCCESS,
        });

        Message.success(
          i18n('registration.doRegisterSuccess'),
        );

        getHistory().push('/registration');
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: registrationFormActions.REGISTER_ERROR,
        });
      }
    },
};

export default registrationFormActions;
