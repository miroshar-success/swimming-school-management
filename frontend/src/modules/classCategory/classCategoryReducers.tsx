import list from 'src/modules/classCategory/list/classCategoryListReducers';
import form from 'src/modules/classCategory/form/classCategoryFormReducers';
import view from 'src/modules/classCategory/view/classCategoryViewReducers';
import destroy from 'src/modules/classCategory/destroy/classCategoryDestroyReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
});
