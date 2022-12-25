import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'studentNumber',
    label: i18n('user.fields.studentNumber'),
  },
  {
    name: 'fullName',
    label: i18n('user.fields.fullName'),
  },
  {
    name: 'email',
    label: i18n('user.fields.email'),
  },
  {
    name: 'sex',
    label: i18n('user.fields.sex'),
  },
  {
    name: 'bloodType',
    label: i18n('user.fields.bloodType'),
  },
  {
    name: 'birthday',
    label: i18n('user.fields.birthday'),
  },
  {
    name: 'phoneNumber',
    label: i18n('user.fields.phoneNumber'),
  },
  {
    name: 'street',
    label: i18n('user.fields.street'),
  },
  {
    name: 'postalCode',
    label: i18n('user.fields.postalCode'),
  },
  {
    name: 'cologne',
    label: i18n('user.fields.cologne'),
  },
  {
    name: 'city',
    label: i18n('user.fields.city'),
  },
  {
    name: 'RFC',
    label: i18n('user.fields.RFC'),
  },
  {
    name: 'CURP',
    label: i18n('user.fields.CURP'),
  },
  {
    name: 'roles',
    label: i18n('user.fields.roles'),
    render: exporterRenders.stringArray(),
  },
  {
    name: 'createdAt',
    label: i18n('user.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
];
