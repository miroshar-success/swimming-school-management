import { createSelector } from 'reselect';

const selectRaw = (state) => state.classCategory.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const classCategoryViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default classCategoryViewSelectors;
