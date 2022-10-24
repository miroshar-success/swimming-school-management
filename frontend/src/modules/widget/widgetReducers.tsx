import { combineReducers } from 'redux';
import tasksByMonth from 'src/modules/widget/tasksByMonth/tasksByMonthReducers';
import tasksOnCalendar from 'src/modules/widget/tasksOnCalendar/tasksOnCalendarReducers';
import upcomingTasks from 'src/modules/widget/upcomingTasks/upcomingTasksReducers';

export default combineReducers({
  tasksByMonth,
  tasksOnCalendar,
  upcomingTasks,
});
