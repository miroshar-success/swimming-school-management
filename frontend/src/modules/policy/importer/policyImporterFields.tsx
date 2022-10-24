import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';
import policyEnumerators from 'src/modules/policy/policyEnumerators';
import moment from 'moment';

export default [
  {
    name: 'name',
    label: i18n('entities.policy.fields.name'),
    schema: schemas.string(
      i18n('entities.policy.fields.name'),
      {
        required: true,
        min: 1,
        max: 100,
      },
    ),
  },
  {
    name: 'type',
    label: i18n('entities.policy.fields.type'),
    schema: schemas.enumerator(
      i18n('entities.policy.fields.type'),
      {
        required: true,
        options: policyEnumerators.type,
      },
    ),
  },
  {
    name: 'version',
    label: i18n('entities.policy.fields.version'),
    schema: schemas.integer(
      i18n('entities.policy.fields.version'),
      {
        required: true,
        min: 1,
      },
    ),
  },
  {
    name: 'lastPublishedDate',
    label: i18n('entities.policy.fields.lastPublishedDate'),
    schema: schemas.date(
      i18n('entities.policy.fields.lastPublishedDate'),
      {},
    ),
    render: (value) =>
      value && value instanceof Date
        ? moment(value).format('YYYY-MM-DD')
        : value,
  },
  {
    name: 'publishedBy',
    label: i18n('entities.policy.fields.publishedBy'),
    schema: schemas.relationToOne(
      i18n('entities.policy.fields.publishedBy'),
      {},
    ),
  },
  {
    name: 'attachment',
    label: i18n('entities.policy.fields.attachment'),
    schema: schemas.files(
      i18n('entities.policy.fields.attachment'),
      {
        required: true,
      },
    ),
  },
  {
    name: 'link',
    label: i18n('entities.policy.fields.link'),
    schema: schemas.string(
      i18n('entities.policy.fields.link'),
      {
        min: 1,
        max: 500,
      },
    ),
  },
];
