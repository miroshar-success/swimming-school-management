import { createSelector } from 'reselect';

const selectRaw = (state) => state.teacher.form;

const selectTeacher = createSelector(
  [selectRaw],
  (raw) => raw.teacher,
);

const selectInitLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.initLoading),
);

const selectSaveLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.saveLoading),
);

const teacherFormSelectors = {
  selectInitLoading,
  selectSaveLoading,
  selectTeacher,
  selectRaw,
};

export default teacherFormSelectors;
