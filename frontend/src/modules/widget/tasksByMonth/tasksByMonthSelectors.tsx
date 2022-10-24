import { createSelector } from 'reselect';

const selectRaw = (state) => state.widget.tasksByMonth;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const selectTotalAmounts = createSelector(
  [selectRaw],
  (raw) => raw.totalAmounts,
);

const selectLineChartDatasets = createSelector(
  [selectRaw],
  (raw) => raw.lineChartDatasets,
);

const tasksByMonthSelectors = {
  selectRaw,
  selectLoading,
  selectTotalAmounts,
  selectLineChartDatasets,
};

export default tasksByMonthSelectors;
