import { createSelector } from 'reselect';

const selectRaw = (state) => state.classCategory.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const classCategoryDestroySelectors = {
  selectLoading,
};

export default classCategoryDestroySelectors;
