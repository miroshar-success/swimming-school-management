import { createSelector } from 'reselect';

const selectRaw = (state) => state.paymentCategory.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const paymentCategoryDestroySelectors = {
  selectLoading,
};

export default paymentCategoryDestroySelectors;
