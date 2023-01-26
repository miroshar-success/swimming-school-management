import actions from 'src/modules/student/form/studentFormActions';

const initialData = {
  saveLoading: false,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.ADD_STARTED) {
    return {
      ...state,
      saveLoading: true,
    };
  }

  if (type === actions.ADD_SUCCESS) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === actions.ADD_ERROR) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  return state;
};
