import { createSelector } from 'reselect';

const selectRaw = (state) => state.student.form;

const selectStudent = createSelector(
  [selectRaw],
  (raw) => raw.student,
);

const selectInitLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.initLoading),
);

const selectSaveLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.saveLoading),
);

const studentFormSelectors = {
  selectInitLoading,
  selectSaveLoading,
  selectStudent,
  selectRaw,
};

export default studentFormSelectors;
