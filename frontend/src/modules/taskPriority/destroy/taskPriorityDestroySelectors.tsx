import { createSelector } from 'reselect';

const selectRaw = (state) => state.taskPriority.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const taskPriorityDestroySelectors = {
  selectLoading,
};

export default taskPriorityDestroySelectors;
