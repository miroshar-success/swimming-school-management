import { createSelector } from 'reselect';

const selectRaw = (state) => state.skill.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const skillDestroySelectors = {
  selectLoading,
};

export default skillDestroySelectors;
