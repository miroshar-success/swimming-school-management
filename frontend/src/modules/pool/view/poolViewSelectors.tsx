import { createSelector } from 'reselect';

const selectRaw = (state) => state.pool.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const poolViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default poolViewSelectors;
