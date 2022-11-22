import { createSelector } from 'reselect';

const selectRaw = (state) => state.paymentMethod.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const paymentMethodDestroySelectors = {
  selectLoading,
};

export default paymentMethodDestroySelectors;
