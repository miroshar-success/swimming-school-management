import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'rssid',
    label: i18n('entities.newsArticle.fields.rssid'),
  },
  {
    name: 'feedURL',
    label: i18n('entities.newsArticle.fields.feedURL'),
  },
  {
    name: 'feedLink',
    label: i18n('entities.newsArticle.fields.feedLink'),
  },
  {
    name: 'feedTitle',
    label: i18n('entities.newsArticle.fields.feedTitle'),
  },
  {
    name: 'feedDescription',
    label: i18n(
      'entities.newsArticle.fields.feedDescription',
    ),
  },
  {
    name: 'feedIcon',
    label: i18n('entities.newsArticle.fields.feedIcon'),
  },
  {
    name: 'title',
    label: i18n('entities.newsArticle.fields.title'),
  },
  {
    name: 'link',
    label: i18n('entities.newsArticle.fields.link'),
  },
  {
    name: 'description',
    label: i18n('entities.newsArticle.fields.description'),
  },
  {
    name: 'image',
    label: i18n('entities.newsArticle.fields.image'),
  },
  {
    name: 'plainDescription',
    label: i18n(
      'entities.newsArticle.fields.plainDescription',
    ),
  },
  {
    name: 'author',
    label: i18n('entities.newsArticle.fields.author'),
  },
  {
    name: 'date',
    label: i18n('entities.newsArticle.fields.date'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'tags',
    label: i18n('entities.newsArticle.fields.tags'),
    render: exporterRenders.relationToMany('tag'),
  },
  {
    name: 'createdAt',
    label: i18n('entities.newsArticle.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.newsArticle.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
