import { createSelector } from 'reselect';

const selectRaw = (state) => state.teacher.view;

const selectTeacher = createSelector(
  [selectRaw],
  (raw) => raw.teacher,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const teacherViewSelectors = {
  selectLoading,
  selectTeacher,
  selectRaw,
};

export default teacherViewSelectors;
