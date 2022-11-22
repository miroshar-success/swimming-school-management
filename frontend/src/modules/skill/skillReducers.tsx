import list from 'src/modules/skill/list/skillListReducers';
import form from 'src/modules/skill/form/skillFormReducers';
import view from 'src/modules/skill/view/skillViewReducers';
import destroy from 'src/modules/skill/destroy/skillDestroyReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
});
