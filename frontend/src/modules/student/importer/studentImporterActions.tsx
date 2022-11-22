import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/student/importer/studentImporterSelectors';
import StudentService from 'src/modules/student/studentService';
import fields from 'src/modules/student/importer/studentImporterFields';
import { i18n } from 'src/i18n';

const studentImporterActions = importerActions(
  'STUDENT_IMPORTER',
  selectors,
  StudentService.import,
  fields,
  i18n('student.importer.fileName'),
);

export default studentImporterActions;
