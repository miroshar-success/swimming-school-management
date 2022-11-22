import actions from 'src/modules/registration/form/registrationFormActions';

const initialData = {
  saveLoading: false,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.REGISTER_STARTED) {
    return {
      ...state,
      saveLoading: true,
    };
  }

  if (type === actions.REGISTER_SUCCESS) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === actions.REGISTER_ERROR) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  return state;
};
