import { createSelector } from 'reselect';

const selectRaw = (state) =>
  state.widget.totalNewStudentsPerMonth;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const selectTotal = createSelector(
  [selectRaw],
  (raw) => raw.total,
);

const totalNewStudentsPerMonthSelectors = {
  selectRaw,
  selectLoading,
  selectTotal,
};

export default totalNewStudentsPerMonthSelectors;
