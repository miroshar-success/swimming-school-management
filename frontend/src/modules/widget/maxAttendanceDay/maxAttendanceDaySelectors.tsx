import { createSelector } from 'reselect';

const selectRaw = (state) => state.widget.maxAttendanceDay;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const selectDay = createSelector(
  [selectRaw],
  (raw) => raw.day,
);

const maxAttendanceDaySelectors = {
  selectRaw,
  selectLoading,
  selectDay,
};

export default maxAttendanceDaySelectors;
