import { createSelector } from 'reselect';

const selectRaw = (state) => state.note.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const noteDestroySelectors = {
  selectLoading,
};

export default noteDestroySelectors;
