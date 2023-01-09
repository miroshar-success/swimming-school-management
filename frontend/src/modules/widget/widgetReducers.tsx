import { combineReducers } from 'redux';
import lessonsOnCalendar from 'src/modules/widget/lessonsOnCalendar/lessonsOnCalendarReducers';
import totalPaymentPerMonth from 'src/modules/widget/totalPaymentPerMonth/totalPaymentPerMonthReducers';

export default combineReducers({
  lessonsOnCalendar,
  totalPaymentPerMonth,
});
