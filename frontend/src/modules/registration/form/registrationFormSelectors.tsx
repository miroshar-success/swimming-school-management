import { createSelector } from 'reselect';

const selectRaw = (state) => state.registration.form;

const selectSaveLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.saveLoading),
);

const registrationFormSelectors = {
  selectSaveLoading,
  selectRaw,
};

export default registrationFormSelectors;
