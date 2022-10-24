import { createSelector } from 'reselect';

const selectRaw = (state) => state.newsFavorite.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const newsFavoriteDestroySelectors = {
  selectLoading,
};

export default newsFavoriteDestroySelectors;
