import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/taskList/importer/taskListImporterSelectors';
import TaskListService from 'src/modules/taskList/taskListService';
import fields from 'src/modules/taskList/importer/taskListImporterFields';
import { i18n } from 'src/i18n';

const taskListImporterActions = importerActions(
  'TASKLIST_IMPORTER',
  selectors,
  TaskListService.import,
  fields,
  i18n('entities.taskList.importer.fileName'),
);

export default taskListImporterActions;
