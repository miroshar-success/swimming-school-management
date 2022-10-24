import { createSelector } from 'reselect';

const selectRaw = (state) => state.taskInstance.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const taskViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default taskViewSelectors;
