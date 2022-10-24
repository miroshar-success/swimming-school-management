import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';
import taskListEnumerators from 'src/modules/taskList/taskListEnumerators';

export default [
  {
    name: 'name',
    label: i18n('entities.taskList.fields.name'),
    schema: schemas.string(
      i18n('entities.taskList.fields.name'),
      {
        required: true,
        min: 1,
        max: 100,
      },
    ),
  },
  {
    name: 'taskdisplaycolor',
    label: i18n(
      'entities.taskList.fields.taskdisplaycolor',
    ),
    schema: schemas.enumerator(
      i18n('entities.taskList.fields.taskdisplaycolor'),
      {
        required: true,
        options: taskListEnumerators.taskdisplaycolor,
      },
    ),
  },
];
