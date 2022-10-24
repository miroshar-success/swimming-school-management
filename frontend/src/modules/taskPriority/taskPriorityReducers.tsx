import list from 'src/modules/taskPriority/list/taskPriorityListReducers';
import form from 'src/modules/taskPriority/form/taskPriorityFormReducers';
import view from 'src/modules/taskPriority/view/taskPriorityViewReducers';
import destroy from 'src/modules/taskPriority/destroy/taskPriorityDestroyReducers';
import importerReducer from 'src/modules/taskPriority/importer/taskPriorityImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
