import { i18n } from 'src/i18n';
import CheckboxViewItem from 'src/view/shared/view/CheckboxViewItem';
import ColorBadge from 'src/view/shared/components/ColorBadge';
import MDBadgeDot from 'src/mui/components/MDBadgeDot';
import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import TagViewItem from 'src/view/tag/view/TagViewItem';
import vendorEnumerators from 'src/modules/vendor/vendorEnumerators';
import VendorRatingViewItem from 'src/view/vendor/view/VendorRatingViewItem';
import VendorStatusViewItem from 'src/view/vendor/view/VendorStatusViewItem';

export default [
  {
    name: 'reference',
    label: i18n('entities.vendor.fields.reference'),
    schema: schemas.integer(
      i18n('entities.vendor.fields.reference'),
      {
        required: true,
      },
    ),
  },
  {
    name: 'name',
    label: i18n('entities.vendor.fields.name'),
    schema: schemas.string(
      i18n('entities.vendor.fields.name'),
      {
        required: true,
        min: 1,
        max: 250,
      },
    ),
  },
  {
    name: 'status',
    label: i18n('entities.vendor.fields.status'),
    schema: schemas.enumerator(
      i18n('entities.vendor.fields.status'),
      {
        required: true,
        options: vendorEnumerators.status,
      },
    ),
    render: (value) => (
      <VendorStatusViewItem value={value} />
    ),
  },
  {
    name: 'rating',
    label: i18n('entities.vendor.fields.rating'),
    schema: schemas.enumerator(
      i18n('entities.vendor.fields.rating'),
      {
        required: true,
        options: vendorEnumerators.rating,
      },
    ),
    render: (value) => (
      <VendorRatingViewItem value={value} />
    ),
  },
  {
    name: 'category',
    label: i18n('entities.vendor.fields.category'),
    schema: schemas.relationToOne(
      i18n('entities.vendor.fields.category'),
      {
        required: true,
      },
    ),
    render: (value) => <ColorBadge label={value} />,
  },
  {
    name: 'dataProcessed',
    label: i18n('entities.vendor.fields.dataProcessed'),
    schema: schemas.stringArray(
      i18n('entities.vendor.fields.dataProcessed'),
      {
        required: true,
      },
    ),
    render: (value) =>
      (value || '')
        .split(/[ ]*,[ ]*/)
        .map((v) => (
          <MDBadgeDot
            key={v}
            width="max-content"
            badgeContent={
              v
                ? i18n(
                    `entities.vendor.enumerators.dataProcessed.${v}`,
                  )
                : null
            }
            variant="contained"
          />
        )),
  },
  {
    name: 'tags',
    label: i18n('entities.vendor.fields.tags'),
    schema: schemas.relationToMany(
      i18n('entities.vendor.fields.tags'),
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
  {
    name: 'industry',
    label: i18n('entities.vendor.fields.industry'),
    schema: schemas.enumerator(
      i18n('entities.vendor.fields.industry'),
      {
        required: true,
        options: vendorEnumerators.industry,
      },
    ),
  },
  {
    name: 'countryOfIncorporation',
    label: i18n(
      'entities.vendor.fields.countryOfIncorporation',
    ),
    schema: schemas.enumerator(
      i18n('entities.vendor.fields.countryOfIncorporation'),
      {
        required: true,
        options: vendorEnumerators.countryOfIncorporation,
      },
    ),
  },
  {
    name: 'primaryContactName',
    label: i18n(
      'entities.vendor.fields.primaryContactName',
    ),
    schema: schemas.string(
      i18n('entities.vendor.fields.primaryContactName'),
      {
        required: true,
        max: 100,
        min: 1,
      },
    ),
  },
  {
    name: 'primaryContactEmail',
    label: i18n(
      'entities.vendor.fields.primaryContactEmail',
    ),
    schema: schemas.string(
      i18n('entities.vendor.fields.primaryContactEmail'),
      {
        required: true,
        max: 100,
        min: 1,
      },
    ),
  },
  {
    name: 'primaryContactPhoneNumber',
    label: i18n(
      'entities.vendor.fields.primaryContactPhoneNumber',
    ),
    schema: schemas.string(
      i18n(
        'entities.vendor.fields.primaryContactPhoneNumber',
      ),
      {
        max: 50,
        min: 1,
      },
    ),
  },
  {
    name: 'supportEmail',
    label: i18n('entities.vendor.fields.supportEmail'),
    schema: schemas.string(
      i18n('entities.vendor.fields.supportEmail'),
      {
        max: 100,
        min: 1,
      },
    ),
  },
  {
    name: 'supportPhoneNumber',
    label: i18n(
      'entities.vendor.fields.supportPhoneNumber',
    ),
    schema: schemas.string(
      i18n('entities.vendor.fields.supportPhoneNumber'),
      {
        max: 50,
        min: 1,
      },
    ),
  },
  {
    name: 'internalBusinessSponsor',
    label: i18n(
      'entities.vendor.fields.internalBusinessSponsor',
    ),
    schema: schemas.string(
      i18n(
        'entities.vendor.fields.internalBusinessSponsor',
      ),
      {
        min: 1,
        max: 200,
      },
    ),
  },
  {
    name: 'descriptionOfServices',
    label: i18n(
      'entities.vendor.fields.descriptionOfServices',
    ),
    schema: schemas.string(
      i18n('entities.vendor.fields.descriptionOfServices'),
      {
        max: 250,
        min: 1,
      },
    ),
  },
  {
    name: 'logo',
    label: i18n('entities.vendor.fields.logo'),
    schema: schemas.images(
      i18n('entities.vendor.fields.logo'),
      {},
    ),
  },
  {
    name: 'website',
    label: i18n('entities.vendor.fields.website'),
    schema: schemas.string(
      i18n('entities.vendor.fields.website'),
      {
        max: 100,
        min: 1,
      },
    ),
  },
  {
    name: 'address',
    label: i18n('entities.vendor.fields.address'),
    schema: schemas.string(
      i18n('entities.vendor.fields.address'),
      {
        max: 500,
        min: 1,
      },
    ),
  },
  {
    name: 'contract',
    label: i18n('entities.vendor.fields.contract'),
    schema: schemas.files(
      i18n('entities.vendor.fields.contract'),
      {},
    ),
  },
  {
    name: 'documentation',
    label: i18n('entities.vendor.fields.documentation'),
    schema: schemas.files(
      i18n('entities.vendor.fields.documentation'),
      {},
    ),
  },
  {
    name: 'dpiaCompleted',
    label: i18n('entities.vendor.fields.dpiaCompleted'),
    schema: schemas.boolean(
      i18n('entities.vendor.fields.dpiaCompleted'),
      {},
    ),
    render: (value) => (
      <CheckboxViewItem
        checked={(value || '').toLowerCase() === 'true'}
      />
    ),
  },
  {
    name: 'dtiaCompleted',
    label: i18n('entities.vendor.fields.dtiaCompleted'),
    schema: schemas.boolean(
      i18n('entities.vendor.fields.dtiaCompleted'),
      {},
    ),
    render: (value) => (
      <CheckboxViewItem
        checked={(value || '').toLowerCase() === 'true'}
      />
    ),
  },
  {
    name: 'iso27001',
    label: i18n('entities.vendor.fields.iso27001'),
    schema: schemas.boolean(
      i18n('entities.vendor.fields.iso27001'),
      {},
    ),
    render: (value) => (
      <CheckboxViewItem
        checked={(value || '').toLowerCase() === 'true'}
      />
    ),
  },
  {
    name: 'soc1',
    label: i18n('entities.vendor.fields.soc1'),
    schema: schemas.boolean(
      i18n('entities.vendor.fields.soc1'),
      {},
    ),
    render: (value) => (
      <CheckboxViewItem
        checked={(value || '').toLowerCase() === 'true'}
      />
    ),
  },
  {
    name: 'soc2',
    label: i18n('entities.vendor.fields.soc2'),
    schema: schemas.boolean(
      i18n('entities.vendor.fields.soc2'),
      {},
    ),
    render: (value) => (
      <CheckboxViewItem
        checked={(value || '').toLowerCase() === 'true'}
      />
    ),
  },
  {
    name: 'hippa',
    label: i18n('entities.vendor.fields.hippa'),
    schema: schemas.boolean(
      i18n('entities.vendor.fields.hippa'),
      {},
    ),
    render: (value) => (
      <CheckboxViewItem
        checked={(value || '').toLowerCase() === 'true'}
      />
    ),
  },
  {
    name: 'pcidss',
    label: i18n('entities.vendor.fields.pcidss'),
    schema: schemas.boolean(
      i18n('entities.vendor.fields.pcidss'),
      {},
    ),
    render: (value) => (
      <CheckboxViewItem
        checked={(value || '').toLowerCase() === 'true'}
      />
    ),
  },
  {
    name: 'fedramp',
    label: i18n('entities.vendor.fields.fedramp'),
    schema: schemas.boolean(
      i18n('entities.vendor.fields.fedramp'),
      {},
    ),
    render: (value) => (
      <CheckboxViewItem
        checked={(value || '').toLowerCase() === 'true'}
      />
    ),
  },
  {
    name: 'gdpr',
    label: i18n('entities.vendor.fields.gdpr'),
    schema: schemas.boolean(
      i18n('entities.vendor.fields.gdpr'),
      {},
    ),
    render: (value) => (
      <CheckboxViewItem
        checked={(value || '').toLowerCase() === 'true'}
      />
    ),
  },
  {
    name: 'ccpa',
    label: i18n('entities.vendor.fields.ccpa'),
    schema: schemas.boolean(
      i18n('entities.vendor.fields.ccpa'),
      {},
    ),
    render: (value) => (
      <CheckboxViewItem
        checked={(value || '').toLowerCase() === 'true'}
      />
    ),
  },
  {
    name: 'sox',
    label: i18n('entities.vendor.fields.sox'),
    schema: schemas.boolean(
      i18n('entities.vendor.fields.sox'),
      {},
    ),
    render: (value) => (
      <CheckboxViewItem
        checked={(value || '').toLowerCase() === 'true'}
      />
    ),
  },
  {
    name: 'cobit',
    label: i18n('entities.vendor.fields.cobit'),
    schema: schemas.boolean(
      i18n('entities.vendor.fields.cobit'),
      {},
    ),
    render: (value) => (
      <CheckboxViewItem
        checked={(value || '').toLowerCase() === 'true'}
      />
    ),
  },
  {
    name: 'risks',
    label: i18n('entities.vendor.fields.risks'),
    schema: schemas.relationToMany(
      i18n('entities.vendor.fields.risks'),
      {},
    ),
  },
  {
    name: 'tasks',
    label: i18n('entities.vendor.fields.tasks'),
    schema: schemas.relationToMany(
      i18n('entities.vendor.fields.tasks'),
      {},
    ),
  },
];
