import PropTypes from 'prop-types';
import taskEnumerators from 'src/modules/task/taskEnumerators';
import EnumColorBadgeViewItem from 'src/view/shared/view/EnumColorBadgeViewItem';

function TaskStatusViewItem(props) {
  const { value, label } = props;
  return (
    <EnumColorBadgeViewItem
      value={value}
      label={label}
      enums={taskEnumerators.status}
      colors={taskEnumerators.statusColor}
      i18nPrefix="entities.task.enumerators.status"
    />
  );
}

TaskStatusViewItem.propsType = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default TaskStatusViewItem;
