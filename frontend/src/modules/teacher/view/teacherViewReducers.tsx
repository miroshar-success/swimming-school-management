import actions from 'src/modules/teacher/view/teacherViewActions';

const initialData = {
  loading: false,
  teacher: null,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.FIND_STARTED) {
    return {
      ...state,
      teacher: null,
      loading: true,
    };
  }

  if (type === actions.FIND_SUCCESS) {
    return {
      ...state,
      teacher: payload,
      loading: false,
    };
  }

  if (type === actions.FIND_ERROR) {
    return {
      ...state,
      teacher: null,
      loading: false,
    };
  }

  return state;
};
