import { createSelector } from 'reselect';

const selectRaw = (state) =>
  state.widget.countMaleAndFemale;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const selectCountMale = createSelector(
  [selectRaw],
  (raw) => raw.countMale,
);

const selectCountFemale = createSelector(
  [selectRaw],
  (raw) => raw.countFemale,
);

const countMaleAndFemaleSelectors = {
  selectRaw,
  selectLoading,
  selectCountMale,
  selectCountFemale,
};

export default countMaleAndFemaleSelectors;
