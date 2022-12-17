import { createSelector } from 'reselect';

const selectRaw = (state) => state.attendance.view;

const selectStudents = createSelector(
  [selectRaw],
  (raw) => raw.students,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const attendanceViewSelectors = {
  selectLoading,
  selectStudents,
  selectRaw,
};

export default attendanceViewSelectors;
