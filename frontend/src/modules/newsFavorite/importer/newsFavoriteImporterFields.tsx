import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'user',
    label: i18n('entities.newsFavorite.fields.user'),
    schema: schemas.relationToOne(
      i18n('entities.newsFavorite.fields.user'),
      {
        required: true,
      },
    ),
  },
  {
    name: 'newsArticle',
    label: i18n('entities.newsFavorite.fields.newsArticle'),
    schema: schemas.relationToOne(
      i18n('entities.newsFavorite.fields.newsArticle'),
      {
        required: true,
      },
    ),
  },
];
