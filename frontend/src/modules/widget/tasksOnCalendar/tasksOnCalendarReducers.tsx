import actions from 'src/modules/widget/tasksOnCalendar/tasksOnCalendarActions';

const initialData = {
  tasks: [],
  totalPages: 1,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.LOADING_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.LOADING_SUCCESS) {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === actions.LOADING_ERROR) {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === actions.MORE_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.MORE_SUCCESS) {
    return {
      ...state,
      loading: false,
      ...payload,
    };
  }

  if (
    type === actions.RESET ||
    type === actions.MORE_ERROR
  ) {
    return {
      ...state,
      loading: false,
      ...initialData,
    };
  }
  return state;
};
