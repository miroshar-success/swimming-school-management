import { createSelector } from 'reselect';

const selectRaw = (state) => state.lesson.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const lessonViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default lessonViewSelectors;
