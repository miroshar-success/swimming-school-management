import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'fullName',
    label: i18n('teacher.fields.fullName'),
  },
  {
    name: 'email',
    label: i18n('teacher.fields.email'),
  },
  {
    name: 'birthday',
    label: i18n('teacher.fields.birthday'),
  },
  {
    name: 'phoneNumber',
    label: i18n('teacher.fields.phoneNumber'),
  },
  {
    name: 'RFC',
    label: i18n('teacher.fields.RFC'),
  },
  {
    name: 'CURP',
    label: i18n('teacher.fields.CURP'),
  },
  {
    name: 'roles',
    label: i18n('teacher.fields.roles'),
    render: exporterRenders.stringArray(),
  },
  {
    name: 'createdAt',
    label: i18n('teacher.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
];
