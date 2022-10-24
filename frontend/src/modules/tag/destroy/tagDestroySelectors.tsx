import { createSelector } from 'reselect';

const selectRaw = (state) => state.tag.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const tagDestroySelectors = {
  selectLoading,
};

export default tagDestroySelectors;
