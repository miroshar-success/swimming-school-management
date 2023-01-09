import { createSelector } from 'reselect';

const selectRaw = (state) =>
  state.widget.totalStudentsByAge;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const selectTotal = createSelector(
  [selectRaw],
  (raw) => raw.total,
);

const totalStudentsByAgeSelectors = {
  selectRaw,
  selectLoading,
  selectTotal,
};

export default totalStudentsByAgeSelectors;
