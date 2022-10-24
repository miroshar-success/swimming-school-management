import list from 'src/modules/risk/list/riskListReducers';
import form from 'src/modules/risk/form/riskFormReducers';
import view from 'src/modules/risk/view/riskViewReducers';
import destroy from 'src/modules/risk/destroy/riskDestroyReducers';
import importerReducer from 'src/modules/risk/importer/riskImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
