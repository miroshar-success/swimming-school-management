import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'tag',
    label: i18n('entities.tag.fields.tag'),
    schema: schemas.string(
      i18n('entities.tag.fields.tag'),
      {
        required: true,
        min: 1,
        max: 50,
      },
    ),
  },
];
