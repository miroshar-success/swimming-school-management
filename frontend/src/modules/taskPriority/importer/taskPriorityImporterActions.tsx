import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/taskPriority/importer/taskPriorityImporterSelectors';
import TaskPriorityService from 'src/modules/taskPriority/taskPriorityService';
import fields from 'src/modules/taskPriority/importer/taskPriorityImporterFields';
import { i18n } from 'src/i18n';

const taskPriorityImporterActions = importerActions(
  'TASKPRIORITY_IMPORTER',
  selectors,
  TaskPriorityService.import,
  fields,
  i18n('entities.taskPriority.importer.fileName'),
);

export default taskPriorityImporterActions;
