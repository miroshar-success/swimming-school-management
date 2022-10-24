import { createSelector } from 'reselect';

const selectRaw = (state) => state.policyTemplate.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const policyTemplateViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default policyTemplateViewSelectors;
