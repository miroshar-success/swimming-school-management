import { createSelector } from 'reselect';

const selectRaw = (state) => state.document.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const documentDestroySelectors = {
  selectLoading,
};

export default documentDestroySelectors;
