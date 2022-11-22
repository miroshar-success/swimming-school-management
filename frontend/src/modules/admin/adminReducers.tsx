import list from 'src/modules/admin/list/adminListReducers';
import form from 'src/modules/admin/form/adminFormReducers';
import view from 'src/modules/admin/view/adminViewReducers';
import importerReducer from 'src/modules/admin/importer/adminImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  form,
  list,
  view,
  importer: importerReducer,
});
