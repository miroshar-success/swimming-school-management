import { createSelector } from 'reselect';

const selectRaw = (state) => state.productCategory.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const productCategoryDestroySelectors = {
  selectLoading,
};

export default productCategoryDestroySelectors;
