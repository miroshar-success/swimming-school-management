import list from 'src/modules/riskCategory/list/riskCategoryListReducers';
import form from 'src/modules/riskCategory/form/riskCategoryFormReducers';
import view from 'src/modules/riskCategory/view/riskCategoryViewReducers';
import destroy from 'src/modules/riskCategory/destroy/riskCategoryDestroyReducers';
import importerReducer from 'src/modules/riskCategory/importer/riskCategoryImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
