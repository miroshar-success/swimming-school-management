import { createSelector } from 'reselect';

const selectRaw = (state) => state.lesson.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const lessonDestroySelectors = {
  selectLoading,
};

export default lessonDestroySelectors;
