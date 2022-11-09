import actions from 'src/modules/user/adminForm/adminFormActions';

const initialData = {
  initLoading: false,
  saveLoading: false,
  admin: null,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.INIT_STARTED) {
    return {
      ...state,
      admin: null,
      initLoading: true,
    };
  }

  if (type === actions.INIT_SUCCESS) {
    return {
      ...state,
      admin: payload,
      initLoading: false,
    };
  }

  if (type === actions.INIT_ERROR) {
    return {
      ...state,
      admin: null,
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
