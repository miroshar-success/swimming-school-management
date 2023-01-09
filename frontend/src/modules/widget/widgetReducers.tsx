import { combineReducers } from 'redux';
import lessonsOnCalendar from 'src/modules/widget/lessonsOnCalendar/lessonsOnCalendarReducers';
import totalPaymentPerMonth from 'src/modules/widget/totalPaymentPerMonth/totalPaymentPerMonthReducers';
import totalPaidStudentsPerMonth from 'src/modules/widget/totalPaidStudentsPerMonth/totalPaidStudentsPerMonthReducers';
import totalNewStudentsPerMonth from 'src/modules/widget/totalNewStudentsPerMonth/totalNewStudentsPerMonthReducers';
import totalStudentsByAge from 'src/modules/widget/totalStudentsByAge/totalStudentsByAgeReducers';
import totalUsers from 'src/modules/widget/totalUsers/totalUsersReducers';
import maxAttendanceDay from 'src/modules/widget/maxAttendanceDay/maxAttendanceDayReducers';

export default combineReducers({
  lessonsOnCalendar,
  totalPaymentPerMonth,
  totalPaidStudentsPerMonth,
  totalNewStudentsPerMonth,
  totalStudentsByAge,
  totalUsers,
  maxAttendanceDay,
});
