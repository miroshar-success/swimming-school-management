import list from 'src/modules/paymentCategory/list/paymentCategoryListReducers';
import form from 'src/modules/paymentCategory/form/paymentCategoryFormReducers';
import view from 'src/modules/paymentCategory/view/paymentCategoryViewReducers';
import destroy from 'src/modules/paymentCategory/destroy/paymentCategoryDestroyReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
});
