import list from 'src/modules/grade/list/gradeListReducers';
import form from 'src/modules/grade/form/gradeFormReducers';
import view from 'src/modules/grade/view/gradeViewReducers';
import destroy from 'src/modules/grade/destroy/gradeDestroyReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
});
