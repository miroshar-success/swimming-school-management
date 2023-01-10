import actions from 'src/modules/widget/countMaleAndFemale/countMaleAndFemaleActions';

const initialData = {
  loading: false,
  countMale: '',
  countFemale: '',
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
      countMale: payload.countMale,
      countFemale: payload.countFemale,
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
