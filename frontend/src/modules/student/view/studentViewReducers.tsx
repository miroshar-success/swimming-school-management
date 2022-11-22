import actions from 'src/modules/student/view/studentViewActions';

const initialData = {
  loading: false,
  student: null,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.FIND_STARTED) {
    return {
      ...state,
      student: null,
      loading: true,
    };
  }

  if (type === actions.FIND_SUCCESS) {
    return {
      ...state,
      student: payload,
      loading: false,
    };
  }

  if (type === actions.FIND_ERROR) {
    return {
      ...state,
      student: null,
      loading: false,
    };
  }

  return state;
};
