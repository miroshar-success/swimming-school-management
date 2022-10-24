import { createSelector } from 'reselect';

const selectRaw = (state) => state.policy.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const policyDestroySelectors = {
  selectLoading,
};

export default policyDestroySelectors;
