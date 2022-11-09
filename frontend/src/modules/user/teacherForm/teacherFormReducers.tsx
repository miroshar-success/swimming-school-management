import actions from 'src/modules/user/teacherForm/teacherFormActions';

const initialData = {
  initLoading: false,
  saveLoading: false,
  teacher: null,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.INIT_STARTED) {
    return {
      ...state,
      teacher: null,
      initLoading: true,
    };
  }

  if (type === actions.INIT_SUCCESS) {
    return {
      ...state,
      teacher: payload,
      initLoading: false,
    };
  }

  if (type === actions.INIT_ERROR) {
    return {
      ...state,
      teacher: null,
      initLoading: false,
    };
  }

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

  if (type === actions.UPDATE_STARTED) {
    return {
      ...state,
      saveLoading: true,
    };
  }

  if (type === actions.UPDATE_SUCCESS) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === actions.UPDATE_ERROR) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  return state;
};
