import list from 'src/modules/student/list/studentListReducers';
import form from 'src/modules/student/form/studentFormReducers';
import view from 'src/modules/student/view/studentViewReducers';
import importerReducer from 'src/modules/student/importer/studentImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  form,
  list,
  view,
  importer: importerReducer,
});
