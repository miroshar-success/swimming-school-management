import { DEFAULT_MOMENT_FORMAT } from 'src/config/common';
import { i18n } from 'src/i18n';
import moment from 'moment';
import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import TagViewItem from 'src/view/tag/view/TagViewItem';

export default [
  {
    name: 'name',
    label: i18n('entities.policyTemplate.fields.name'),
    schema: schemas.string(
      i18n('entities.policyTemplate.fields.name'),
      {
        required: true,
        min: 1,
        max: 100,
      },
    ),
  },
  {
    name: 'description',
    label: i18n(
      'entities.policyTemplate.fields.description',
    ),
    schema: schemas.string(
      i18n('entities.policyTemplate.fields.description'),
      {
        required: true,
        min: 1,
        max: 500,
      },
    ),
  },
  {
    name: 'lastUpdated',
    label: i18n(
      'entities.policyTemplate.fields.lastUpdated',
    ),
    schema: schemas.date(
      i18n('entities.policyTemplate.fields.lastUpdated'),
      {
        required: true,
      },
    ),
    render: (value) =>
      value && value instanceof Date
        ? moment(value).format(DEFAULT_MOMENT_FORMAT)
        : value,
  },
  {
    name: 'attachment',
    label: i18n(
      'entities.policyTemplate.fields.attachment',
    ),
    schema: schemas.files(
      i18n('entities.policyTemplate.fields.attachment'),
      {
        required: true,
      },
    ),
  },
  {
    name: 'tags',
    label: i18n('entities.policyTemplate.fields.tags'),
    schema: schemas.relationToMany(
      i18n('entities.policyTemplate.fields.tags'),
      {},
    ),
    render: (value) => (
      <TagViewItem
        value={
          value
            ? value
                .split(/[ ]*,[ ]*/)
                .map((v) => ({ id: v, tag: v }))
            : null
        }
        hideNoViewItem
      />
    ),
  },
];
