import { createSelector } from 'reselect';

const selectRaw = (state) => state.policyTemplate.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const policyTemplateDestroySelectors = {
  selectLoading,
};

export default policyTemplateDestroySelectors;
