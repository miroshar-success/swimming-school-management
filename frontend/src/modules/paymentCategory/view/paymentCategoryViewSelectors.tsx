import { createSelector } from 'reselect';

const selectRaw = (state) => state.paymentCategory.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const paymentCategoryViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default paymentCategoryViewSelectors;
