import { createSelector } from 'reselect';

const selectRaw = (state) => state.admin.view;

const selectAdmin = createSelector(
  [selectRaw],
  (raw) => raw.admin,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const adminViewSelectors = {
  selectLoading,
  selectAdmin,
  selectRaw,
};

export default adminViewSelectors;
