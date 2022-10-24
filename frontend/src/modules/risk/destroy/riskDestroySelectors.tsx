import { createSelector } from 'reselect';

const selectRaw = (state) => state.risk.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const riskDestroySelectors = {
  selectLoading,
};

export default riskDestroySelectors;
