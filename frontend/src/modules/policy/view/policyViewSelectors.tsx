import { createSelector } from 'reselect';

const selectRaw = (state) => state.policy.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const policyViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default policyViewSelectors;
