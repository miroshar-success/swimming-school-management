import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/task/importer/taskImporterSelectors';
import TaskService from 'src/modules/task/taskService';
import fields from 'src/modules/task/importer/taskImporterFields';
import { i18n } from 'src/i18n';

const taskImporterActions = importerActions(
  'TASK_IMPORTER',
  selectors,
  TaskService.import,
  fields,
  i18n('entities.task.importer.fileName'),
);

export default taskImporterActions;
