import { createSelector } from 'reselect';

const selectRaw = (state) => state.attendance.list;

const selectLoading = createSelector(
  [selectRaw],
  (raw) => raw.loading,
);

const selectLessons = createSelector(
  [selectRaw],
  (raw) => raw.lessons,
);

const attendanceListSelectors = {
  selectLoading,
  selectLessons,
};

export default attendanceListSelectors;
