import { createSelector } from 'reselect';

const selectRaw = (state) =>
  state.organizationProfile.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const organizationProfileDestroySelectors = {
  selectLoading,
};

export default organizationProfileDestroySelectors;
