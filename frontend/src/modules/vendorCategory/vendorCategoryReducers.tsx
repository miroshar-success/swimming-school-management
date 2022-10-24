import list from 'src/modules/vendorCategory/list/vendorCategoryListReducers';
import form from 'src/modules/vendorCategory/form/vendorCategoryFormReducers';
import view from 'src/modules/vendorCategory/view/vendorCategoryViewReducers';
import destroy from 'src/modules/vendorCategory/destroy/vendorCategoryDestroyReducers';
import importerReducer from 'src/modules/vendorCategory/importer/vendorCategoryImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
