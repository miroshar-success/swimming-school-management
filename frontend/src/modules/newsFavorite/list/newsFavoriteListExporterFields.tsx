import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.newsFavorite.fields.id'),
  },
  {
    name: 'user',
    label: i18n('entities.newsFavorite.fields.user'),
    render: exporterRenders.relationToOne(),
  },
  {
    name: 'newsArticle',
    label: i18n('entities.newsFavorite.fields.newsArticle'),
    render: exporterRenders.relationToOne(),
  },
  {
    name: 'createdAt',
    label: i18n('entities.newsFavorite.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.newsFavorite.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
