import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/teacher/importer/teacherImporterSelectors';
import TeacherService from 'src/modules/teacher/teacherService';
import fields from 'src/modules/teacher/importer/teacherImporterFields';
import { i18n } from 'src/i18n';

const teacherImporterActions = importerActions(
  'TEACHER_IMPORTER',
  selectors,
  TeacherService.import,
  fields,
  i18n('teacher.importer.fileName'),
);

export default teacherImporterActions;
