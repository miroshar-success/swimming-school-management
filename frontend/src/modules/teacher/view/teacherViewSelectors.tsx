import { createSelector } from 'reselect';

const selectRaw = (state) => state.teacher.view;

const selectTeacher = createSelector(
  [selectRaw],
  (raw) => raw.teacher,
);

const selectLessons = createSelector(
  [selectRaw],
  (raw) => raw.lessons,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const teacherViewSelectors = {
  selectLoading,
  selectTeacher,
  selectLessons,
  selectRaw,
};

export default teacherViewSelectors;
