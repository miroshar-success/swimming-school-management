import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'priority',
    label: i18n('entities.taskPriority.fields.priority'),
    schema: schemas.string(
      i18n('entities.taskPriority.fields.priority'),
      {
        required: true,
        min: 1,
        max: 50,
      },
    ),
  },
];
