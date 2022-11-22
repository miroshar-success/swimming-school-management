import { createSelector } from 'reselect';

const selectRaw = (state) => state.grade.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const gradeDestroySelectors = {
  selectLoading,
};

export default gradeDestroySelectors;
