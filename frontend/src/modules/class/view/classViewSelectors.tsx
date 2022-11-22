import { createSelector } from 'reselect';

const selectRaw = (state) => state.class.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const classViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default classViewSelectors;
