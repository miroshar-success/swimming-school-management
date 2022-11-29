import { createSelector } from 'reselect';

const selectRaw = (state) => state.payment.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const paymentDestroySelectors = {
  selectLoading,
};

export default paymentDestroySelectors;
