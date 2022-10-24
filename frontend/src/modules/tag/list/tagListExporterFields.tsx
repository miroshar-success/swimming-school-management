import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.tag.fields.id'),
  },
  {
    name: 'tag',
    label: i18n('entities.tag.fields.tag'),
  },
  {
    name: 'createdAt',
    label: i18n('entities.tag.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.tag.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
