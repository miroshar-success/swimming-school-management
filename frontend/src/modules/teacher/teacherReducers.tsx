import list from 'src/modules/teacher/list/teacherListReducers';
import form from 'src/modules/teacher/form/teacherFormReducers';
import view from 'src/modules/teacher/view/teacherViewReducers';
import importerReducer from 'src/modules/teacher/importer/teacherImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  form,
  list,
  view,
  importer: importerReducer,
});
