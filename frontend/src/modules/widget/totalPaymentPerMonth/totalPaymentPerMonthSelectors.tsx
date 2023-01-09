import { createSelector } from 'reselect';

const selectRaw = (state) =>
  state.widget.totalPaymentPerMonth;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const selectTotal = createSelector(
  [selectRaw],
  (raw) => raw.total,
);

const totalPaymentPerMonthSelectors = {
  selectRaw,
  selectLoading,
  selectTotal,
};

export default totalPaymentPerMonthSelectors;
