import { createSelector } from 'reselect';

const selectRaw = (state) => state.task.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const taskDestroySelectors = {
  selectLoading,
};

export default taskDestroySelectors;
