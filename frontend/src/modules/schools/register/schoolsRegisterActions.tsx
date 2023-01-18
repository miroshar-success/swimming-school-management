import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import SchoolsService from 'src/modules/schools/schoolsService';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import authSelectors from 'src/modules/auth/authSelectors';
import authActions from 'src/modules/auth/authActions';

const prefix = 'SCHOOLS_REGISTER';

const schoolsRegisterActions = {
  ADD_STARTED: `${prefix}_ADD_STARTED`,
  ADD_SUCCESS: `${prefix}_ADD_SUCCESS`,
  ADD_ERROR: `${prefix}_ADD_ERROR`,

  doAdd: (id, values) => async (dispatch) => {
    try {
      dispatch({
        type: schoolsRegisterActions.ADD_STARTED,
      });

      await SchoolsService.create(id, values);

      dispatch({
        type: schoolsRegisterActions.ADD_SUCCESS,
      });

      Message.success(i18n('student.doAddSuccess'));

      getHistory().push(`/student/${id}`);
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: schoolsRegisterActions.ADD_ERROR,
      });
    }
  },
};

export default schoolsRegisterActions;
