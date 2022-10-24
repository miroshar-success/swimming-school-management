import colors from 'src/mui/assets/theme/base/colors';

const taskEnumerators = {
  repeat: [
    'Never',
    'Daily',
    'Weekdays',
    'Weekends',
    'Weekly',
    'Biweekly',
    'Monthly',
    'Every 3 Months',
    'Every 6 Months',
    'Annually',
  ],
  status: ['Backlog', 'ToDo', 'In progress', 'Complete'],
  statusColor: [
    colors.backlog.main,
    colors.todo.main,
    colors.inprogress.main,
    colors.success.main,
  ],
};

export default taskEnumerators;
