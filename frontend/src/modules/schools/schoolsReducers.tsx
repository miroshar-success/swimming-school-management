import list from 'src/modules/schools/list/schoolsListReducers';
import view from 'src/modules/schools/view/schoolsViewReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  view,
});
