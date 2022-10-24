import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/newsArticle/importer/newsArticleImporterSelectors';
import NewsArticleService from 'src/modules/newsArticle/newsArticleService';
import fields from 'src/modules/newsArticle/importer/newsArticleImporterFields';
import { i18n } from 'src/i18n';

const newsArticleImporterActions = importerActions(
  'NEWSARTICLE_IMPORTER',
  selectors,
  NewsArticleService.import,
  fields,
  i18n('entities.newsArticle.importer.fileName'),
);

export default newsArticleImporterActions;
