import list from 'src/modules/newsFavorite/list/newsFavoriteListReducers';
import form from 'src/modules/newsFavorite/form/newsFavoriteFormReducers';
import view from 'src/modules/newsFavorite/view/newsFavoriteViewReducers';
import destroy from 'src/modules/newsFavorite/destroy/newsFavoriteDestroyReducers';
import importerReducer from 'src/modules/newsFavorite/importer/newsFavoriteImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
