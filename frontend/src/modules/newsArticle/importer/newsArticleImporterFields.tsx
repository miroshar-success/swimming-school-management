import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';
import moment from 'moment';
import { DEFAULT_MOMENT_FORMAT } from 'src/config/common';
import TagViewItem from 'src/view/tag/view/TagViewItem';

export default [
  {
    name: 'rssid',
    label: i18n('entities.newsArticle.fields.rssid'),
    schema: schemas.string(
      i18n('entities.newsArticle.fields.rssid'),
      {
        required: true,
        min: 1,
        max: 50,
      },
    ),
  },
  {
    name: 'feedURL',
    label: i18n('entities.newsArticle.fields.feedURL'),
    schema: schemas.string(
      i18n('entities.newsArticle.fields.feedURL'),
      {
        required: true,
        min: 1,
        max: 100,
      },
    ),
  },
  {
    name: 'feedLink',
    label: i18n('entities.newsArticle.fields.feedLink'),
    schema: schemas.string(
      i18n('entities.newsArticle.fields.feedLink'),
      {
        required: true,
        min: 1,
        max: 200,
      },
    ),
  },
  {
    name: 'feedTitle',
    label: i18n('entities.newsArticle.fields.feedTitle'),
    schema: schemas.string(
      i18n('entities.newsArticle.fields.feedTitle'),
      {
        required: true,
        min: 1,
        max: 100,
      },
    ),
  },
  {
    name: 'feedDescription',
    label: i18n(
      'entities.newsArticle.fields.feedDescription',
    ),
    schema: schemas.string(
      i18n('entities.newsArticle.fields.feedDescription'),
      {},
    ),
  },
  {
    name: 'feedIcon',
    label: i18n('entities.newsArticle.fields.feedIcon'),
    schema: schemas.string(
      i18n('entities.newsArticle.fields.feedIcon'),
      {
        required: true,
        min: 1,
        max: 200,
      },
    ),
  },
  {
    name: 'title',
    label: i18n('entities.newsArticle.fields.title'),
    schema: schemas.string(
      i18n('entities.newsArticle.fields.title'),
      {
        required: true,
        min: 1,
        max: 500,
      },
    ),
  },
  {
    name: 'link',
    label: i18n('entities.newsArticle.fields.link'),
    schema: schemas.string(
      i18n('entities.newsArticle.fields.link'),
      {
        required: true,
        min: 1,
        max: 1000,
      },
    ),
  },
  {
    name: 'description',
    label: i18n('entities.newsArticle.fields.description'),
    schema: schemas.string(
      i18n('entities.newsArticle.fields.description'),
      {
        required: true,
        min: 1,
        max: 2500,
      },
    ),
  },
  {
    name: 'image',
    label: i18n('entities.newsArticle.fields.image'),
    schema: schemas.string(
      i18n('entities.newsArticle.fields.image'),
      {
        max: 1000,
      },
    ),
  },
  {
    name: 'plainDescription',
    label: i18n(
      'entities.newsArticle.fields.plainDescription',
    ),
    schema: schemas.string(
      i18n('entities.newsArticle.fields.plainDescription'),
      {
        max: 2500,
      },
    ),
  },
  {
    name: 'author',
    label: i18n('entities.newsArticle.fields.author'),
    schema: schemas.string(
      i18n('entities.newsArticle.fields.author'),
      {
        max: 250,
      },
    ),
  },
  {
    name: 'date',
    label: i18n('entities.newsArticle.fields.date'),
    schema: schemas.datetime(
      i18n('entities.newsArticle.fields.date'),
      {
        required: true,
      },
    ),
    render: (value) =>
      value && value instanceof Date
        ? moment(value).format(DEFAULT_MOMENT_FORMAT)
        : value,
  },
  {
    name: 'tags',
    label: i18n('entities.newsArticle.fields.tags'),
    schema: schemas.relationToMany(
      i18n('entities.newsArticle.fields.tags'),
      {},
    ),
    render: (value) => (
      <TagViewItem
        value={
          value
            ? value
                .split(/[ ]*,[ ]*/)
                .map((v) => ({ id: v, tag: v }))
            : null
        }
        hideNoViewItem
      />
    ),
  },
];
