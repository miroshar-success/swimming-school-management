import { createSelector } from 'reselect';

const selectRaw = (state) => state.schools.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const schoolsViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default schoolsViewSelectors;
