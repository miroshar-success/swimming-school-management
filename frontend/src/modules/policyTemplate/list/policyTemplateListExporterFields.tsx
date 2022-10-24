import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.policyTemplate.fields.id'),
  },
  {
    name: 'name',
    label: i18n('entities.policyTemplate.fields.name'),
  },
  {
    name: 'description',
    label: i18n(
      'entities.policyTemplate.fields.description',
    ),
  },
  {
    name: 'lastUpdated',
    label: i18n(
      'entities.policyTemplate.fields.lastUpdated',
    ),
    render: exporterRenders.datetime(),
  },
  {
    name: 'attachment',
    label: i18n(
      'entities.policyTemplate.fields.attachment',
    ),
    render: exporterRenders.filesOrImages(),
  },
  {
    name: 'tags',
    label: i18n('entities.policyTemplate.fields.tags'),
    render: exporterRenders.relationToMany('tag'),
  },
  {
    name: 'createdAt',
    label: i18n('entities.policyTemplate.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.policyTemplate.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
