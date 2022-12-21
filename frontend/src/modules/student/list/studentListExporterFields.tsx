import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'studentNumber',
    label: i18n('student.fields.studentNumber'),
  },
  {
    name: 'fullName',
    label: i18n('student.fields.fullName'),
  },
  {
    name: 'email',
    label: i18n('student.fields.email'),
  },
  {
    name: 'sex',
    label: i18n('student.fields.sex'),
  },
  {
    name: 'bloodType',
    label: i18n('student.fields.bloodType'),
  },
  {
    name: 'birthday',
    label: i18n('student.fields.birthday'),
  },
  {
    name: 'phoneNumber',
    label: i18n('student.fields.phoneNumber'),
  },
  {
    name: 'street',
    label: i18n('student.fields.street'),
  },
  {
    name: 'postalCode',
    label: i18n('student.fields.postalCode'),
  },
  {
    name: 'cologne',
    label: i18n('student.fields.cologne'),
  },
  {
    name: 'city',
    label: i18n('student.fields.city'),
  },
  {
    name: 'RFC',
    label: i18n('student.fields.RFC'),
  },
  {
    name: 'CURP',
    label: i18n('student.fields.CURP'),
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
