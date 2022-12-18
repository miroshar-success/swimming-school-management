import actions from 'src/modules/attendance/view/attendanceViewActions';

const initialData = {
  loading: false,
  saveLoading: false,
  students: [],
  class: '',
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.FIND_STARTED) {
    return {
      ...state,
      students: [],
      class: '',
      loading: true,
    };
  }

  if (type === actions.FIND_SUCCESS) {
    return {
      ...state,
      students: payload.students,
      class: payload.lesson[0]?.class.name,
      loading: false,
    };
  }

  if (type === actions.FIND_ERROR) {
    return {
      ...state,
      students: [],
      class: '',
      loading: false,
    };
  }

  if (type === actions.CREATE_STARTED) {
    return {
      ...state,
      saveLoading: true,
    };
  }

  if (type === actions.CREATE_SUCCESS) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === actions.CREATE_ERROR) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  return state;
};
