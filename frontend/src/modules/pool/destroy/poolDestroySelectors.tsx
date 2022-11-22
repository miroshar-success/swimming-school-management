import { createSelector } from 'reselect';

const selectRaw = (state) => state.pool.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const poolDestroySelectors = {
  selectLoading,
};

export default poolDestroySelectors;
