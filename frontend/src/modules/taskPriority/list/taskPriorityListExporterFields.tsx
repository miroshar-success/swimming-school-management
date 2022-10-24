import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.taskPriority.fields.id'),
  },
  {
    name: 'priority',
    label: i18n('entities.taskPriority.fields.priority'),
  },
  {
    name: 'createdAt',
    label: i18n('entities.taskPriority.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.taskPriority.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
