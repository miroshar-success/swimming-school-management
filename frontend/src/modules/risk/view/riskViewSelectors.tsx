import { createSelector } from 'reselect';

const selectRaw = (state) => state.risk.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const riskViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default riskViewSelectors;
