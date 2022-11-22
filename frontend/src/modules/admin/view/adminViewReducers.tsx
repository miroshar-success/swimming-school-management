import actions from 'src/modules/admin/view/adminViewActions';

const initialData = {
  loading: false,
  admin: null,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.FIND_STARTED) {
    return {
      ...state,
      admin: null,
      loading: true,
    };
  }

  if (type === actions.FIND_SUCCESS) {
    return {
      ...state,
      admin: payload,
      loading: false,
    };
  }

  if (type === actions.FIND_ERROR) {
    return {
      ...state,
      admin: null,
      loading: false,
    };
  }

  return state;
};
