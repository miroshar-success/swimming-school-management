import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'message',
    label: i18n('entities.note.fields.message'),
    schema: schemas.string(
      i18n('entities.note.fields.message'),
      {
        required: true,
        max: 1000,
        min: 1,
      },
    ),
  },
];
