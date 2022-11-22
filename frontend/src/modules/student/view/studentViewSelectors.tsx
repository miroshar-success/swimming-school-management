import { createSelector } from 'reselect';

const selectRaw = (state) => state.student.view;

const selectStudent = createSelector(
  [selectRaw],
  (raw) => raw.student,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const studentViewSelectors = {
  selectLoading,
  selectStudent,
  selectRaw,
};

export default studentViewSelectors;
