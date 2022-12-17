import actions from 'src/modules/attendance/view/attendanceViewActions';

const initialData = {
  loading: false,
  students: [],
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.FIND_STARTED) {
    return {
      ...state,
      students: [],
      loading: true,
    };
  }

  if (type === actions.FIND_SUCCESS) {
    return {
      ...state,
      students: payload,
      loading: false,
    };
  }

  if (type === actions.FIND_ERROR) {
    return {
      ...state,
      students: [],
      loading: false,
    };
  }

  return state;
};
