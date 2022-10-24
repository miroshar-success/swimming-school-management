import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useSelector } from 'react-redux';
import ColorBadge from 'src/view/shared/components/ColorBadge';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import NoViewItem from 'src/view/shared/view/NoViewItem';
import PropTypes from 'prop-types';
import selectors from 'src/modules/taskPriority/taskPrioritySelectors';
import taskPriorityEnumerators from 'src/modules/taskPriority/taskPriorityEnumerators';

function TaskPriorityViewItem(props) {
  const { darkMode } = selectMuiSettings();
  const hasPermissionToRead = useSelector(
    selectors.selectPermissionToRead,
  );

  const valueAsArray = () => {
    const { value } = props;

    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value;
    }

    return [value];
  };

  const colorFn = (priority) =>
    taskPriorityEnumerators.priorityColor[
      taskPriorityEnumerators.priority.indexOf(priority)
    ];

  const renderPriority = (priority) => {
    const color = colorFn(priority);
    return <ColorBadge label={priority} color={color} />;
  };

  const displayableRecord = (record) => {
    if (hasPermissionToRead) {
      return (
        <MDBox key={record.id}>
          <MaterialLink
            component={Link}
            to={`/task-priority/${record.id}`}
          >
            {renderPriority(record.priority)}
          </MaterialLink>
        </MDBox>
      );
    }

    return (
      <MDBox key={record.id}>
        {renderPriority(record.priority)}
      </MDBox>
    );
  };

  if (!valueAsArray().length) {
    return <NoViewItem {...props} />;
  }

  return (
    <MDBox
      pt={props.hiddenLabel ? 0 : 1.6}
      position="relative"
    >
      {!props.hiddenLabel && (
        <MDTypography
          variant="caption"
          color={darkMode ? 'text' : 'secondary'}
          fontWeight="regular"
          lineHeight={1}
          position="absolute"
          top="0"
        >
          {props.label}
        </MDTypography>
      )}
      <MDBox
        display="inline-flex"
        flexWrap="wrap"
        gap={0.8}
      >
        {valueAsArray().map((value) =>
          displayableRecord(value),
        )}
      </MDBox>
    </MDBox>
  );
}

TaskPriorityViewItem.defaultProps = {
  hiddenLabel: false,
};

TaskPriorityViewItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  hiddenLabel: PropTypes.bool,
};

export default TaskPriorityViewItem;
