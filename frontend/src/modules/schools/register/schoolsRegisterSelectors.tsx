import { createSelector } from 'reselect';

const selectRaw = (state) => state.student.form;

const selectSaveLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.saveLoading),
);

const schoolsRegisterSelectors = {
  selectSaveLoading,
  selectRaw,
};

export default schoolsRegisterSelectors;
