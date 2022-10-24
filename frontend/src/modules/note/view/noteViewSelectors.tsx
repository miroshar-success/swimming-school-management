import { createSelector } from 'reselect';

const selectRaw = (state) => state.note.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const noteViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default noteViewSelectors;
