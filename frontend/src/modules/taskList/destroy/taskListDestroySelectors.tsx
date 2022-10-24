import { createSelector } from 'reselect';

const selectRaw = (state) => state.taskList.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const taskListDestroySelectors = {
  selectLoading,
};

export default taskListDestroySelectors;
