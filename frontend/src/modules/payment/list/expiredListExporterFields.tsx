import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('payment.fields.id'),
  },
  {
    name: 'studentNumber',
    label: i18n('student.fields.studentNumber'),
  },
  {
    name: 'fullName',
    label: i18n('student.fields.fullName'),
  },
  {
    name: 'month',
    label: i18n('payment.fields.month'),
  },
  {
    name: 'year',
    label: i18n('payment.fields.year'),
  },
  {
    name: 'expiredDate',
    label: i18n('payment.fields.expiredDate'),
  },
  {
    name: 'cost',
    label: i18n('payment.fields.cost'),
    render: exporterRenders.stringArray(),
  },
];
