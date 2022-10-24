import { createSelector } from 'reselect';

const selectRaw = (state) => state.vendorCategory.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const vendorCategoryDestroySelectors = {
  selectLoading,
};

export default vendorCategoryDestroySelectors;
