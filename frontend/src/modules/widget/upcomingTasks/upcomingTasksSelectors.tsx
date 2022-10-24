import { createSelector } from 'reselect';

const selectRaw = (state) => state.widget.upcomingTasks;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const selectUpcomingTasks = createSelector(
  [selectRaw],
  (raw) => raw.data,
);

const upcomingTasksSelectors = {
  selectRaw,
  selectLoading,
  selectUpcomingTasks,
};

export default upcomingTasksSelectors;
