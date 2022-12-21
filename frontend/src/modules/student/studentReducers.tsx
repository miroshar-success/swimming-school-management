import list from 'src/modules/student/list/studentListReducers';
import form from 'src/modules/student/form/studentFormReducers';
import view from 'src/modules/student/view/studentViewReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  form,
  list,
  view,
});
