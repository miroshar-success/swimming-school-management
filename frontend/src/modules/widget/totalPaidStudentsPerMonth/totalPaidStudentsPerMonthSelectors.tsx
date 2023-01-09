import { createSelector } from 'reselect';

const selectRaw = (state) =>
  state.widget.totalPaidStudentsPerMonth;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const selectTotal = createSelector(
  [selectRaw],
  (raw) => raw.total,
);

const totalPaidStudentsPerMonthSelectors = {
  selectRaw,
  selectLoading,
  selectTotal,
};

export default totalPaidStudentsPerMonthSelectors;
