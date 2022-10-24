import { createSelector } from 'reselect';

const selectRaw = (state) => state.taskPriority.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const taskPriorityViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default taskPriorityViewSelectors;
