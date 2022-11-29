import form from 'src/modules/payment/form/paymentFormReducers';
import destroy from 'src/modules/payment/destroy/paymentDestroyReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  form,
  destroy,
});
