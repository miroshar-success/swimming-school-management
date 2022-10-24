import list from 'src/modules/tag/list/tagListReducers';
import form from 'src/modules/tag/form/tagFormReducers';
import view from 'src/modules/tag/view/tagViewReducers';
import destroy from 'src/modules/tag/destroy/tagDestroyReducers';
import importerReducer from 'src/modules/tag/importer/tagImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
