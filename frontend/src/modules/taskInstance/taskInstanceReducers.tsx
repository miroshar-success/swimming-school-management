import destroy from 'src/modules/taskInstance/destroy/taskInstanceDestroyReducers';
import form from 'src/modules/taskInstance/form/taskInstanceFormReducers';
import list from 'src/modules/taskInstance/list/taskInstanceListReducers';
import view from 'src/modules/taskInstance/view/taskInstanceViewReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  destroy,
  form,
  list,
  view,
});
