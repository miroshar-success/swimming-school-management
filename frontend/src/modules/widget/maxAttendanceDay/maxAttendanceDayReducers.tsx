import actions from 'src/modules/widget/maxAttendanceDay/maxAttendanceDayActions';

const initialData = {
  loading: false,
  day: {},
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.GET_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.GET_SUCCESS) {
    return {
      ...state,
      loading: false,
      day: payload,
    };
  }

  if (type === actions.GET_ERROR) {
    return {
      ...state,
      loading: false,
    };
  }

  return state;
};
