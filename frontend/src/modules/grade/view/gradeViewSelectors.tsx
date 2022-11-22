import { createSelector } from 'reselect';

const selectRaw = (state) => state.grade.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const gradeViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default gradeViewSelectors;
