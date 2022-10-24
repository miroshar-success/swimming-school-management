import { createSelector } from 'reselect';

const selectRaw = (state) => state.document.form;

const selectSaveLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.saveLoading),
);

const documentFormSelectors = {
  selectSaveLoading,
  selectRaw,
};

export default documentFormSelectors;
