import { combineReducers } from 'redux';
import lessonsOnCalendar from 'src/modules/widget/lessonsOnCalendar/lessonsOnCalendarReducers';
import totalPaymentPerMonth from 'src/modules/widget/totalPaymentPerMonth/totalPaymentPerMonthReducers';
import totalPaidStudentsPerMonth from 'src/modules/widget/totalPaidStudentsPerMonth/totalPaidStudentsPerMonthReducers';
import totalNewStudentsPerMonth from 'src/modules/widget/totalNewStudentsPerMonth/totalNewStudentsPerMonthReducers';

export default combineReducers({
  lessonsOnCalendar,
  totalPaymentPerMonth,
  totalPaidStudentsPerMonth,
  totalNewStudentsPerMonth,
});
