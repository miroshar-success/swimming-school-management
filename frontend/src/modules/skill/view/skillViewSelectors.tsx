import { createSelector } from 'reselect';

const selectRaw = (state) => state.skill.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const skillViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default skillViewSelectors;
