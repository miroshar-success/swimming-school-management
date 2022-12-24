import list from 'src/modules/document/list/documentListReducers';
import form from 'src/modules/document/form/documentFormReducers';
import destroy from 'src/modules/document/destroy/documentDestroyReducers';
import view from 'src/modules/document/view/documentViewReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  destroy,
  view,
});
