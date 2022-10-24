import { createSelector } from 'reselect';

const selectRaw = (state) => state.riskCategory.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const riskCategoryDestroySelectors = {
  selectLoading,
};

export default riskCategoryDestroySelectors;
