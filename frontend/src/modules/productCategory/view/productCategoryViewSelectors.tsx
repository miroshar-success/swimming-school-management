import { createSelector } from 'reselect';

const selectRaw = (state) => state.productCategory.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const productCategoryViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default productCategoryViewSelectors;
