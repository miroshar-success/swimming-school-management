import actions from 'src/modules/widget/totalUsers/totalUsersActions';

const initialData = {
  loading: false,
  totalStudents: '',
  totalTeachers: '',
  totalManagers: '',
  totalUsers: '',
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.GET_TOTAL_STUDENTS_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.GET_TOTAL_STUDENTS_SUCCESS) {
    return {
      ...state,
      loading: false,
      totalStudents: payload,
    };
  }

  if (type === actions.GET_TOTAL_STUDENTS_ERROR) {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === actions.GET_TOTAL_TEACHERS_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.GET_TOTAL_TEACHERS_SUCCESS) {
    return {
      ...state,
      loading: false,
      totalTeachers: payload,
    };
  }

  if (type === actions.GET_TOTAL_TEACHERS_ERROR) {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === actions.GET_TOTAL_MANAGERS_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.GET_TOTAL_MANAGERS_SUCCESS) {
    return {
      ...state,
      loading: false,
      totalManagers: payload,
    };
  }

  if (type === actions.GET_TOTAL_MANAGERS_ERROR) {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === actions.GET_TOTAL_USERS_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.GET_TOTAL_USERS_SUCCESS) {
    return {
      ...state,
      loading: false,
      totalUsers: payload,
    };
  }

  if (type === actions.GET_TOTAL_USERS_ERROR) {
    return {
      ...state,
      loading: false,
    };
  }

  return state;
};
