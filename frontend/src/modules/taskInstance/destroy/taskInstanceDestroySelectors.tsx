import { createSelector } from 'reselect';

const selectRaw = (state) => state.taskInstance.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const taskInstanceDestroySelectors = {
  selectLoading,
};

export default taskInstanceDestroySelectors;
