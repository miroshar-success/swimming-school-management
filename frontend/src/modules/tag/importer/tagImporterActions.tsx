import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/tag/importer/tagImporterSelectors';
import TagService from 'src/modules/tag/tagService';
import fields from 'src/modules/tag/importer/tagImporterFields';
import { i18n } from 'src/i18n';

const tagImporterActions = importerActions(
  'TAG_IMPORTER',
  selectors,
  TagService.import,
  fields,
  i18n('entities.tag.importer.fileName'),
);

export default tagImporterActions;
