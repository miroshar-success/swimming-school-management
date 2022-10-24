import list from 'src/modules/productCategory/list/productCategoryListReducers';
import form from 'src/modules/productCategory/form/productCategoryFormReducers';
import view from 'src/modules/productCategory/view/productCategoryViewReducers';
import destroy from 'src/modules/productCategory/destroy/productCategoryDestroyReducers';
import importerReducer from 'src/modules/productCategory/importer/productCategoryImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
