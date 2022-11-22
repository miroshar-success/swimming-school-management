import list from 'src/modules/pool/list/poolListReducers';
import form from 'src/modules/pool/form/poolFormReducers';
import view from 'src/modules/pool/view/poolViewReducers';
import destroy from 'src/modules/pool/destroy/poolDestroyReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
});
