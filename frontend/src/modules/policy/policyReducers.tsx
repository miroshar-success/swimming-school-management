import list from 'src/modules/policy/list/policyListReducers';
import form from 'src/modules/policy/form/policyFormReducers';
import view from 'src/modules/policy/view/policyViewReducers';
import destroy from 'src/modules/policy/destroy/policyDestroyReducers';
import importerReducer from 'src/modules/policy/importer/policyImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
