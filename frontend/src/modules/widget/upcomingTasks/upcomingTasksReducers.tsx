import actions from 'src/modules/widget/upcomingTasks/upcomingTasksActions';

const initialData = {
  data: [],
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.INIT_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.INIT_SUCCESS) {
    return {
      ...state,
      loading: false,
      ...payload,
    };
  }

  if (type === actions.INIT_ERROR) {
    return {
      ...state,
      loading: false,
      ...initialData,
    };
  }
  return state;
};
