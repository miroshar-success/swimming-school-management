import list from 'src/modules/policyTemplate/list/policyTemplateListReducers';
import form from 'src/modules/policyTemplate/form/policyTemplateFormReducers';
import view from 'src/modules/policyTemplate/view/policyTemplateViewReducers';
import destroy from 'src/modules/policyTemplate/destroy/policyTemplateDestroyReducers';
import importerReducer from 'src/modules/policyTemplate/importer/policyTemplateImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
