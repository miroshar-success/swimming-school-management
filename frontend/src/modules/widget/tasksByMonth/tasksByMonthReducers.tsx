import actions from 'src/modules/widget/tasksByMonth/tasksByMonthActions';

const initialData = {
  totalAmounts: {
    all: 0,
    completed: 0,
    overdue: 0,
    notCompleted: 0,
  },
  lineChartDatasets: {
    labels: [],
    datasets: [],
  },
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
