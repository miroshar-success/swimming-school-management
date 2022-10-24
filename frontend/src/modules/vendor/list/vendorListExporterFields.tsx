import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.vendor.fields.id'),
  },
  {
    name: 'reference',
    label: i18n('entities.vendor.fields.reference'),
  },
  {
    name: 'name',
    label: i18n('entities.vendor.fields.name'),
  },
  {
    name: 'status',
    label: i18n('entities.vendor.fields.status'),
  },
  {
    name: 'rating',
    label: i18n('entities.vendor.fields.rating'),
  },
  {
    name: 'category',
    label: i18n('entities.vendor.fields.category'),
    render: exporterRenders.relationToOne('name'),
  },
  {
    name: 'dataProcessed',
    label: i18n('entities.vendor.fields.dataProcessed'),
    render: exporterRenders.stringArray(),
  },
  {
    name: 'tags',
    label: i18n('entities.vendor.fields.tags'),
    render: exporterRenders.relationToMany('tag'),
  },
  {
    name: 'industry',
    label: i18n('entities.vendor.fields.industry'),
  },
  {
    name: 'countryOfIncorporation',
    label: i18n(
      'entities.vendor.fields.countryOfIncorporation',
    ),
  },
  {
    name: 'primaryContactName',
    label: i18n(
      'entities.vendor.fields.primaryContactName',
    ),
  },
  {
    name: 'primaryContactEmail',
    label: i18n(
      'entities.vendor.fields.primaryContactEmail',
    ),
  },
  {
    name: 'primaryContactPhoneNumber',
    label: i18n(
      'entities.vendor.fields.primaryContactPhoneNumber',
    ),
  },
  {
    name: 'supportEmail',
    label: i18n('entities.vendor.fields.supportEmail'),
  },
  {
    name: 'supportPhoneNumber',
    label: i18n(
      'entities.vendor.fields.supportPhoneNumber',
    ),
  },
  {
    name: 'internalBusinessSponsor',
    label: i18n(
      'entities.vendor.fields.internalBusinessSponsor',
    ),
  },
  {
    name: 'descriptionOfServices',
    label: i18n(
      'entities.vendor.fields.descriptionOfServices',
    ),
  },
  {
    name: 'logo',
    label: i18n('entities.vendor.fields.logo'),
    render: exporterRenders.filesOrImages(),
  },
  {
    name: 'website',
    label: i18n('entities.vendor.fields.website'),
  },
  {
    name: 'address',
    label: i18n('entities.vendor.fields.address'),
  },
  {
    name: 'contract',
    label: i18n('entities.vendor.fields.contract'),
    render: exporterRenders.filesOrImages(),
  },
  {
    name: 'documentation',
    label: i18n('entities.vendor.fields.documentation'),
    render: exporterRenders.filesOrImages(),
  },
  {
    name: 'dpiaCompleted',
    label: i18n('entities.vendor.fields.dpiaCompleted'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'dtiaCompleted',
    label: i18n('entities.vendor.fields.dtiaCompleted'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'iso27001',
    label: i18n('entities.vendor.fields.iso27001'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'soc1',
    label: i18n('entities.vendor.fields.soc1'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'soc2',
    label: i18n('entities.vendor.fields.soc2'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'hippa',
    label: i18n('entities.vendor.fields.hippa'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'pcidss',
    label: i18n('entities.vendor.fields.pcidss'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'fedramp',
    label: i18n('entities.vendor.fields.fedramp'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'gdpr',
    label: i18n('entities.vendor.fields.gdpr'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'ccpa',
    label: i18n('entities.vendor.fields.ccpa'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'sox',
    label: i18n('entities.vendor.fields.sox'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'cobit',
    label: i18n('entities.vendor.fields.cobit'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'risks',
    label: i18n('entities.vendor.fields.risks'),
    render: exporterRenders.relationToMany('title'),
  },
  {
    name: 'tasks',
    label: i18n('entities.vendor.fields.tasks'),
    render: exporterRenders.relationToMany('title'),
  },
  {
    name: 'createdAt',
    label: i18n('entities.vendor.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.vendor.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
