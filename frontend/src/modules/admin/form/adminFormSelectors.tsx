import { createSelector } from 'reselect';

const selectRaw = (state) => state.admin.form;

const selectAdmin = createSelector(
  [selectRaw],
  (raw) => raw.admin,
);

const selectInitLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.initLoading),
);

const selectSaveLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.saveLoading),
);

const adminFormSelectors = {
  selectInitLoading,
  selectSaveLoading,
  selectAdmin,
  selectRaw,
};

export default adminFormSelectors;
