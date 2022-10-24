import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import MaterialLink from '@mui/material/Link';
import { useSelector } from 'react-redux';
import selectors from 'src/modules/taskList/taskListSelectors';
import ColorBadge from 'src/view/shared/components/ColorBadge';
import MDBox from 'src/mui/components/MDBox';
import taskListEnumerators from 'src/modules/taskList/taskListEnumerators';

function TaskListListItem(props) {
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

  const colorFn = (taskdisplaycolor) =>
    taskListEnumerators.taskdisplaycolorColor[
      taskListEnumerators.taskdisplaycolor.indexOf(
        taskdisplaycolor,
      )
    ];

  const displayableRecord = (record) => {
    if (hasPermissionToRead) {
      return (
        <MDBox key={record.id}>
          <MaterialLink
            component={Link}
            to={`/task-list/${record.id}`}
          >
            <ColorBadge
              label={record.name}
              color={colorFn(record.taskdisplaycolor)}
            />
          </MaterialLink>
        </MDBox>
      );
    }

    return (
      <MDBox key={record.id}>
        <ColorBadge
          label={record.name}
          color={colorFn(record.taskdisplaycolor)}
        />
      </MDBox>
    );
  };

  if (!valueAsArray().length) {
    return null;
  }

  return (
    <MDBox display="inline-flex" flexWrap="wrap" gap={0.8}>
      {valueAsArray().map((value) =>
        displayableRecord(value),
      )}
    </MDBox>
  );
}

TaskListListItem.propTypes = {
  value: PropTypes.any,
};

export default TaskListListItem;
