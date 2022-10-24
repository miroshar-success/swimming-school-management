import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.note.fields.id'),
  },
  {
    name: 'message',
    label: i18n('entities.note.fields.message'),
  },
  {
    name: 'createdAt',
    label: i18n('entities.note.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.note.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
