import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'fullName',
    label: i18n('user.fields.fullName'),
  },
  {
    name: 'email',
    label: i18n('user.fields.email'),
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
