import { i18n } from 'src/i18n';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';

function TaskListTableHeaderCells(props) {
  const { sorter, doChangeSort } = props;
  return (
    <>
      <DataTableHeadCell
        onClick={() => doChangeSort('reference')}
        sorted={
          sorter.field === 'reference'
            ? sorter.order
            : 'none'
        }
        noWrap
      >
        {i18n('entities.task.fields.reference')}
      </DataTableHeadCell>
      <DataTableHeadCell
        onClick={() => doChangeSort('title')}
        sorted={
          sorter.field === 'title' ? sorter.order : 'none'
        }
        noWrap
      >
        {i18n('entities.task.fields.title')}
      </DataTableHeadCell>
      <DataTableHeadCell sorted={false} noWrap>
        {i18n('entities.task.fields.owner')}
      </DataTableHeadCell>
      <DataTableHeadCell sorted={false} noWrap>
        {i18n('entities.task.fields.approver')}
      </DataTableHeadCell>
      <DataTableHeadCell
        onClick={() => doChangeSort('status')}
        sorted={
          sorter.field === 'status' ? sorter.order : 'none'
        }
        noWrap
      >
        {i18n('entities.task.fields.status')}
      </DataTableHeadCell>
      <DataTableHeadCell sorted={false} noWrap>
        {i18n('entities.task.fields.priority')}
      </DataTableHeadCell>
      <DataTableHeadCell sorted={false} noWrap>
        {i18n('entities.task.fields.taskList')}
      </DataTableHeadCell>
      <DataTableHeadCell
        onClick={() => doChangeSort('dueDate')}
        sorted={
          sorter.field === 'dueDate' ? sorter.order : 'none'
        }
        noWrap
      >
        {i18n('entities.task.fields.dueDate')}
      </DataTableHeadCell>
      <DataTableHeadCell sorted={false}>
        {i18n('entities.task.fields.tags')}
      </DataTableHeadCell>
      <DataTableHeadCell
        onClick={() => doChangeSort('repeat')}
        sorted={
          sorter.field === 'repeat' ? sorter.order : 'none'
        }
        noWrap
      >
        {i18n('entities.task.fields.repeat')}
      </DataTableHeadCell>
      <DataTableHeadCell
        onClick={() => doChangeSort('completedDate')}
        sorted={
          sorter.field === 'completedDate'
            ? sorter.order
            : 'none'
        }
        noWrap
      >
        {i18n('entities.task.fields.completedDate')}
      </DataTableHeadCell>
    </>
  );
}

export default TaskListTableHeaderCells;
