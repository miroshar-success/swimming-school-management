import { createSelector } from 'reselect';

const selectRaw = (state) => state.widget.totalUsers;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const selectTotalStudents = createSelector(
  [selectRaw],
  (raw) => raw.totalStudents,
);

const selectTotalTeachers = createSelector(
  [selectRaw],
  (raw) => raw.totalTeachers,
);

const selectTotalManagers = createSelector(
  [selectRaw],
  (raw) => raw.totalManagers,
);

const selectTotalUsers = createSelector(
  [selectRaw],
  (raw) => raw.totalUsers,
);

const totalUsersSelectors = {
  selectRaw,
  selectLoading,
  selectTotalStudents,
  selectTotalTeachers,
  selectTotalManagers,
  selectTotalUsers,
};

export default totalUsersSelectors;
