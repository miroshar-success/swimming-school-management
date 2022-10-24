import { createSelector } from 'reselect';

const selectRaw = (state) => state.taskList.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const taskListViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default taskListViewSelectors;
