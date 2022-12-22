import actions from 'src/modules/teacher/view/teacherViewActions';

const initialData = {
  loading: false,
  teacher: null,
  lessons: [],
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.FIND_STARTED) {
    return {
      ...state,
      teacher: null,
      lessons: [],
      loading: true,
    };
  }

  if (type === actions.FIND_SUCCESS) {
    return {
      ...state,
      teacher: payload.user,
      lessons: payload.lessons,
      loading: false,
    };
  }

  if (type === actions.FIND_ERROR) {
    return {
      ...state,
      teacher: null,
      lessons: [],
      loading: false,
    };
  }

  return state;
};
