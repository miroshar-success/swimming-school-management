import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('student.fields.id'),
  },
  {
    name: 'email',
    label: i18n('student.fields.email'),
  },
  {
    name: 'fullName',
    label: i18n('student.fields.fullName'),
  },
  {
    name: 'phoneNumber',
    label: i18n('student.fields.phoneNumber'),
  },
  {
    name: 'avatars',
    label: i18n('student.fields.avatars'),
    render: exporterRenders.filesOrImages(),
  },
  {
    name: 'roles',
    label: i18n('student.fields.roles'),
    render: exporterRenders.stringArray(),
  },
  {
    name: 'createdAt',
    label: i18n('student.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
];
