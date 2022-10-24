import { createSelector } from 'reselect';

const selectRaw = (state) => state.vendor.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const vendorDestroySelectors = {
  selectLoading,
};

export default vendorDestroySelectors;
