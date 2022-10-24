import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.task.fields.id'),
  },
  {
    name: 'reference',
    label: i18n('entities.task.fields.reference'),
  },
  {
    name: 'title',
    label: i18n('entities.task.fields.title'),
  },
  {
    name: 'owner',
    label: i18n('entities.task.fields.owner'),
    render: exporterRenders.relationToOneUser(),
  },
  {
    name: 'approver',
    label: i18n('entities.task.fields.approver'),
    render: exporterRenders.relationToOneUser(),
  },
  {
    name: 'status',
    label: i18n('entities.task.fields.status'),
  },
  {
    name: 'priority',
    label: i18n('entities.task.fields.priority'),
    render: exporterRenders.relationToOne('priority'),
  },
  {
    name: 'taskList',
    label: i18n('entities.task.fields.taskList'),
    render: exporterRenders.relationToMany('name'),
  },
  {
    name: 'dueDate',
    label: i18n('entities.task.fields.dueDate'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'repeat',
    label: i18n('entities.task.fields.repeat'),
  },
  {
    name: 'completedDate',
    label: i18n('entities.task.fields.completedDate'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'description',
    label: i18n('entities.task.fields.description'),
  },
  {
    name: 'notes',
    label: i18n('entities.task.fields.notes'),
    render: exporterRenders.relationToMany('message'),
  },
  {
    name: 'attachments',
    label: i18n('entities.task.fields.attachments'),
    render: exporterRenders.filesOrImages(),
  },
  {
    name: 'tags',
    label: i18n('entities.task.fields.tags'),
    render: exporterRenders.relationToMany('tag'),
  },
  {
    name: 'createdAt',
    label: i18n('entities.task.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.task.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
