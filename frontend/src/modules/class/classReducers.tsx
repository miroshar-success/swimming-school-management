import list from 'src/modules/class/list/classListReducers';
import form from 'src/modules/class/form/classFormReducers';
import view from 'src/modules/class/view/classViewReducers';
import destroy from 'src/modules/class/destroy/classDestroyReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
});
