import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.policy.fields.id'),
  },
  {
    name: 'name',
    label: i18n('entities.policy.fields.name'),
  },
  {
    name: 'type',
    label: i18n('entities.policy.fields.type'),
  },
  {
    name: 'version',
    label: i18n('entities.policy.fields.version'),
  },
  {
    name: 'lastPublishedDate',
    label: i18n('entities.policy.fields.lastPublishedDate'),
  },
  {
    name: 'publishedBy',
    label: i18n('entities.policy.fields.publishedBy'),
    render: exporterRenders.relationToOne(),
  },
  {
    name: 'attachment',
    label: i18n('entities.policy.fields.attachment'),
    render: exporterRenders.filesOrImages(),
  },
  {
    name: 'link',
    label: i18n('entities.policy.fields.link'),
  },
  {
    name: 'createdAt',
    label: i18n('entities.policy.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.policy.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
