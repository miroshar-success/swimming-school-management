import { createSelector } from 'reselect';

const selectRaw = (state) => state.newsFavorite.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const newsFavoriteViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default newsFavoriteViewSelectors;
