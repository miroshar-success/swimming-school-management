import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/newsFavorite/importer/newsFavoriteImporterSelectors';
import NewsFavoriteService from 'src/modules/newsFavorite/newsFavoriteService';
import fields from 'src/modules/newsFavorite/importer/newsFavoriteImporterFields';
import { i18n } from 'src/i18n';

const newsFavoriteImporterActions = importerActions(
  'NEWSFAVORITE_IMPORTER',
  selectors,
  NewsFavoriteService.import,
  fields,
  i18n('entities.newsFavorite.importer.fileName'),
);

export default newsFavoriteImporterActions;
