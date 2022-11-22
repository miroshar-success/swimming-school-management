import { i18n } from 'src/i18n';
import schemas from 'src/modules/shared/yup/yupImporterSchemas';

export default [
  {
    name: 'email',
    label: i18n('teacher.fields.email'),
    schema: schemas.email(i18n('teacher.fields.email')),
  },
  {
    name: 'roles',
    label: i18n('teacher.fields.roles'),
    schema: schemas.stringArray(
      i18n('teacher.fields.roles'),
    ),
  },
];
