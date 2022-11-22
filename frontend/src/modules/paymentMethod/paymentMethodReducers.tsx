import list from 'src/modules/paymentMethod/list/paymentMethodListReducers';
import form from 'src/modules/paymentMethod/form/paymentMethodFormReducers';
import view from 'src/modules/paymentMethod/view/paymentMethodViewReducers';
import destroy from 'src/modules/paymentMethod/destroy/paymentMethodDestroyReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
});
