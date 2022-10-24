import { createSelector } from 'reselect';

const selectRaw = (state) => state.tag.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const tagViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default tagViewSelectors;
