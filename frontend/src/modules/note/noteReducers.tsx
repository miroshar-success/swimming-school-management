import list from 'src/modules/note/list/noteListReducers';
import form from 'src/modules/note/form/noteFormReducers';
import view from 'src/modules/note/view/noteViewReducers';
import destroy from 'src/modules/note/destroy/noteDestroyReducers';
import importerReducer from 'src/modules/note/importer/noteImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
