import { createSelector } from 'reselect';

const selectRaw = (state) => state.widget.lessonsOnCalendar;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const selectLessons = createSelector(
  [selectRaw],
  (raw) => raw.lessons ?? [],
);

const selectTotalPages = createSelector(
  [selectRaw],
  (raw) => raw.totalPages ?? 1,
);

const lessonsOnCalendarSelectors = {
  selectRaw,
  selectLoading,
  selectLessons,
  selectTotalPages,
};

export default lessonsOnCalendarSelectors;
