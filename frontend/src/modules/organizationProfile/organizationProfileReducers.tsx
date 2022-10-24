import list from 'src/modules/organizationProfile/list/organizationProfileListReducers';
import form from 'src/modules/organizationProfile/form/organizationProfileFormReducers';
import view from 'src/modules/organizationProfile/view/organizationProfileViewReducers';
import destroy from 'src/modules/organizationProfile/destroy/organizationProfileDestroyReducers';
import importerReducer from 'src/modules/organizationProfile/importer/organizationProfileImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
