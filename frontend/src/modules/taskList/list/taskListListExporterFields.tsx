import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.taskList.fields.id'),
  },
  {
    name: 'name',
    label: i18n('entities.taskList.fields.name'),
  },
  {
    name: 'taskdisplaycolor',
    label: i18n(
      'entities.taskList.fields.taskdisplaycolor',
    ),
  },
  {
    name: 'createdAt',
    label: i18n('entities.taskList.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.taskList.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
