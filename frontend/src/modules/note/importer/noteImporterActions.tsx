import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/note/importer/noteImporterSelectors';
import NoteService from 'src/modules/note/noteService';
import fields from 'src/modules/note/importer/noteImporterFields';
import { i18n } from 'src/i18n';

const noteImporterActions = importerActions(
  'NOTE_IMPORTER',
  selectors,
  NoteService.import,
  fields,
  i18n('entities.note.importer.fileName'),
);

export default noteImporterActions;
