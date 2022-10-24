import { i18n } from 'src/i18n';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import moment from 'moment';
import TaskListListItem from 'src/view/taskList/list/TaskListListItem';
import TaskPriorityListItem from 'src/view/taskPriority/list/TaskPriorityListItem';
import TaskStatusViewItem from 'src/view/task/view/TaskStatusViewItem';
import UserListItem from 'src/view/user/list/UserListItem';
import { getAbsoluteDateTimeByHour } from 'src/modules/utils';
import { DEFAULT_MOMENT_FORMAT } from 'src/config/common';
import TagListItem from 'src/view/tag/list/TagListItem';

function TaskListTableBodyCells(props) {
  const { row } = props;
  return (
    <>
      <DataTableBodyCell align="right">
        {row.reference}
      </DataTableBodyCell>
      <DataTableBodyCell>{row.title}</DataTableBodyCell>
      <DataTableBodyCell>
        <UserListItem value={row.owner} />
      </DataTableBodyCell>
      <DataTableBodyCell>
        <UserListItem value={row.approver} />
      </DataTableBodyCell>
      <DataTableBodyCell>
        <TaskStatusViewItem value={row.status} />
      </DataTableBodyCell>
      <DataTableBodyCell>
        <TaskPriorityListItem value={row.priority} />
      </DataTableBodyCell>
      <DataTableBodyCell>
        <TaskListListItem value={row.taskList} />
      </DataTableBodyCell>
      <DataTableBodyCell>
        {row.dueDate
          ? moment(
              getAbsoluteDateTimeByHour(row.dueDate),
            ).format(DEFAULT_MOMENT_FORMAT)
          : null}
      </DataTableBodyCell>
      <DataTableBodyCell>
        <TagListItem value={row.tags} />
      </DataTableBodyCell>
      <DataTableBodyCell
        fontWeight={row.repeat === 'Never' ? null : 'bold'}
      >
        {row.repeat
          ? i18n(
              `entities.task.enumerators.repeat.${row.repeat}`,
            )
          : null}
      </DataTableBodyCell>
      <DataTableBodyCell>
        {row.completedDate
          ? moment(row.completedDate).format(
              DEFAULT_MOMENT_FORMAT,
            )
          : null}
      </DataTableBodyCell>
    </>
  );
}

export default TaskListTableBodyCells;
