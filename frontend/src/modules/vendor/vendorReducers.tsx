import list from 'src/modules/vendor/list/vendorListReducers';
import form from 'src/modules/vendor/form/vendorFormReducers';
import view from 'src/modules/vendor/view/vendorViewReducers';
import destroy from 'src/modules/vendor/destroy/vendorDestroyReducers';
import importerReducer from 'src/modules/vendor/importer/vendorImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
