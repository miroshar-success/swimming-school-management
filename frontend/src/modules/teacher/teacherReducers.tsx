import list from 'src/modules/teacher/list/teacherListReducers';
import form from 'src/modules/teacher/form/teacherFormReducers';
import view from 'src/modules/teacher/view/teacherViewReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  form,
  list,
  view,
});
