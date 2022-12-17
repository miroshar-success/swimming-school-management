import actions from 'src/modules/attendance/list/attendanceListActions';

const initialData = {
  lessons: [] as Array<any>,
  loading: false,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.FETCH_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.FETCH_SUCCESS) {
    return {
      ...state,
      loading: false,
      lessons: payload.lessons,
    };
  }

  if (type === actions.FETCH_ERROR) {
    return {
      ...state,
      loading: false,
      lessons: [],
    };
  }

  return state;
};
