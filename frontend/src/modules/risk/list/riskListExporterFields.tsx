import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.risk.fields.id'),
  },
  {
    name: 'reference',
    label: i18n('entities.risk.fields.reference'),
  },
  {
    name: 'title',
    label: i18n('entities.risk.fields.title'),
  },
  {
    name: 'status',
    label: i18n('entities.risk.fields.status'),
  },
  {
    name: 'owner',
    label: i18n('entities.risk.fields.owner'),
    render: exporterRenders.relationToOneUser(),
  },
  {
    name: 'description',
    label: i18n('entities.risk.fields.description'),
  },
  {
    name: 'category',
    label: i18n('entities.risk.fields.category'),
    render: exporterRenders.relationToOne('name'),
  },
  {
    name: 'likelihood',
    label: i18n('entities.risk.fields.likelihood'),
  },
  {
    name: 'impact',
    label: i18n('entities.risk.fields.impact'),
  },
  {
    name: 'inherentScore',
    label: i18n('entities.risk.fields.inherentScore'),
  },
  {
    name: 'residualScore',
    label: i18n('entities.risk.fields.residualScore'),
  },
  {
    name: 'cost',
    label: i18n('entities.risk.fields.cost'),
    render: exporterRenders.decimal(),
  },
  {
    name: 'tags',
    label: i18n('entities.risk.fields.tags'),
    render: exporterRenders.relationToMany('tag'),
  },
  {
    name: 'notes',
    label: i18n('entities.risk.fields.notes'),
    render: exporterRenders.relationToMany('message'),
  },
  {
    name: 'attachments',
    label: i18n('entities.risk.fields.attachments'),
    render: exporterRenders.filesOrImages(),
  },
  {
    name: 'tasks',
    label: i18n('entities.risk.fields.tasks'),
    render: exporterRenders.relationToMany('title'),
  },
  {
    name: 'createdAt',
    label: i18n('entities.risk.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.risk.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
