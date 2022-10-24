import { DEFAULT_MOMENT_FORMAT } from 'src/config/common';
import { i18n } from 'src/i18n';
import moment from 'moment';
import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import TagViewItem from 'src/view/tag/view/TagViewItem';
import taskEnumerators from 'src/modules/task/taskEnumerators';
import TaskListListItem from 'src/view/taskList/list/TaskListListItem';
import TaskPriorityListItem from 'src/view/taskPriority/list/TaskPriorityListItem';
import TaskStatusViewItem from 'src/view/task/view/TaskStatusViewItem';

export default [
  {
    name: 'reference',
    label: i18n('entities.task.fields.reference'),
    schema: schemas.integer(
      i18n('entities.task.fields.reference'),
      {
        required: true,
      },
    ),
  },
  {
    name: 'title',
    label: i18n('entities.task.fields.title'),
    schema: schemas.string(
      i18n('entities.task.fields.title'),
      {
        required: true,
        max: 200,
        min: 1,
      },
    ),
  },
  {
    name: 'owner',
    label: i18n('entities.task.fields.owner'),
    schema: schemas.relationToOne(
      i18n('entities.task.fields.owner'),
      {},
    ),
  },
  {
    name: 'approver',
    label: i18n('entities.task.fields.approver'),
    schema: schemas.relationToOne(
      i18n('entities.task.fields.approver'),
      {},
    ),
  },
  {
    name: 'status',
    label: i18n('entities.task.fields.status'),
    schema: schemas.enumerator(
      i18n('entities.task.fields.status'),
      {
        required: true,
        options: taskEnumerators.status,
      },
    ),
    render: (value) => <TaskStatusViewItem value={value} />,
  },
  {
    name: 'priority',
    label: i18n('entities.task.fields.priority'),
    schema: schemas.relationToOne(
      i18n('entities.task.fields.priority'),
      {
        required: true,
      },
    ),
    render: (value) => (
      <TaskPriorityListItem value={{ priority: value }} />
    ),
  },
  {
    name: 'taskList',
    label: i18n('entities.task.fields.taskList'),
    schema: schemas.relationToMany(
      i18n('entities.task.fields.taskList'),
      {
        required: true,
      },
    ),
    render: (value) => (
      <TaskListListItem
        value={(value || '')
          .split(/[ ]*,[ ]*/)
          .map((v) => ({
            id: v,
            name: v,
          }))}
      />
    ),
  },
  {
    name: 'dueDate',
    label: i18n('entities.task.fields.dueDate'),
    schema: schemas.datetime(
      i18n('entities.task.fields.dueDate'),
      {},
    ),
    render: (value) =>
      value && value instanceof Date
        ? moment(value).format(DEFAULT_MOMENT_FORMAT)
        : value,
  },
  {
    name: 'repeat',
    label: i18n('entities.task.fields.repeat'),
    schema: schemas.enumerator(
      i18n('entities.task.fields.repeat'),
      {
        required: true,
        options: taskEnumerators.repeat,
      },
    ),
  },
  {
    name: 'completedDate',
    label: i18n('entities.task.fields.completedDate'),
    schema: schemas.datetime(
      i18n('entities.task.fields.completedDate'),
      {},
    ),
    render: (value) =>
      value && value instanceof Date
        ? moment(value).format(DEFAULT_MOMENT_FORMAT)
        : value,
  },
  {
    name: 'description',
    label: i18n('entities.task.fields.description'),
    schema: schemas.string(
      i18n('entities.task.fields.description'),
      {
        max: 1000,
        min: 1,
      },
    ),
  },
  {
    name: 'notes',
    label: i18n('entities.task.fields.notes'),
    schema: schemas.relationToMany(
      i18n('entities.task.fields.notes'),
      {
        max: 50,
      },
    ),
  },
  {
    name: 'attachments',
    label: i18n('entities.task.fields.attachments'),
    schema: schemas.files(
      i18n('entities.task.fields.attachments'),
      {},
    ),
  },
  {
    name: 'tags',
    label: i18n('entities.task.fields.tags'),
    schema: schemas.relationToMany(
      i18n('entities.task.fields.tags'),
      {},
    ),
    render: (value) => (
      <TagViewItem
        value={
          value
            ? value
                .split(/[ ]*,[ ]*/)
                .map((v) => ({ id: v, tag: v }))
            : null
        }
        hideNoViewItem
      />
    ),
  },
];
