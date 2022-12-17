import list from 'src/modules/attendance/list/attendanceListReducers';
import view from 'src/modules/attendance/view/attendanceViewReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  view,
});
