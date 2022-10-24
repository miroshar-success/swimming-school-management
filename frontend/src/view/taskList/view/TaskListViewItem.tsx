import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useSelector } from 'react-redux';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import NoViewItem from 'src/view/shared/view/NoViewItem';
import PropTypes from 'prop-types';
import selectors from 'src/modules/taskList/taskListSelectors';
import ColorBadge from 'src/view/shared/components/ColorBadge';
import taskListEnumerators from 'src/modules/taskList/taskListEnumerators';

function TaskListViewItem(props) {
  const { sidenavColor, darkMode } = selectMuiSettings();
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
    return <NoViewItem {...props} />;
  }

  return (
    <MDBox pt={1.6} position="relative">
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

TaskListViewItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
};

export default TaskListViewItem;
