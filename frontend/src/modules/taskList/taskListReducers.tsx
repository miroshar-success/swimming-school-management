import list from 'src/modules/taskList/list/taskListListReducers';
import form from 'src/modules/taskList/form/taskListFormReducers';
import view from 'src/modules/taskList/view/taskListViewReducers';
import destroy from 'src/modules/taskList/destroy/taskListDestroyReducers';
import importerReducer from 'src/modules/taskList/importer/taskListImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
