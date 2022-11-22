import { createSelector } from 'reselect';

const selectRaw = (state) => state.class.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const classDestroySelectors = {
  selectLoading,
};

export default classDestroySelectors;
