import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.productCategory.fields.id'),
  },
  {
    name: 'name',
    label: i18n('entities.productCategory.fields.name'),
  },
  {
    name: 'createdAt',
    label: i18n(
      'entities.productCategory.fields.createdAt',
    ),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n(
      'entities.productCategory.fields.updatedAt',
    ),
    render: exporterRenders.datetime(),
  },
];
