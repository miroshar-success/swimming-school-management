import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.product.fields.id'),
  },
  {
    name: 'reference',
    label: i18n('entities.product.fields.reference'),
  },
  {
    name: 'title',
    label: i18n('entities.product.fields.title'),
  },
  {
    name: 'description',
    label: i18n('entities.product.fields.description'),
  },
  {
    name: 'category',
    label: i18n('entities.product.fields.category'),
    render: exporterRenders.relationToOne('name'),
  },
  {
    name: 'website',
    label: i18n('entities.product.fields.website'),
  },
  {
    name: 'logo',
    label: i18n('entities.product.fields.logo'),
    render: exporterRenders.filesOrImages(),
  },
  {
    name: 'rating',
    label: i18n('entities.product.fields.rating'),
    render: exporterRenders.decimal(),
  },
  {
    name: 'price',
    label: i18n('entities.product.fields.price'),
  },
  {
    name: 'tags',
    label: i18n('entities.product.fields.tags'),
    render: exporterRenders.relationToMany('tag'),
  },
  {
    name: 'createdAt',
    label: i18n('entities.product.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.product.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
