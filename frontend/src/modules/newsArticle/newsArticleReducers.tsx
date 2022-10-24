import list from 'src/modules/newsArticle/list/newsArticleListReducers';
import form from 'src/modules/newsArticle/form/newsArticleFormReducers';
import view from 'src/modules/newsArticle/view/newsArticleViewReducers';
import destroy from 'src/modules/newsArticle/destroy/newsArticleDestroyReducers';
import importerReducer from 'src/modules/newsArticle/importer/newsArticleImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
