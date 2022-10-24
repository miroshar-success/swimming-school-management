import { i18n } from 'src/i18n';
import ColorBadge from 'src/view/shared/components/ColorBadge';
import PriceListItem from 'src/view/shared/table/PriceListItem';
import RatingListItem from 'src/view/shared/table/RatingListItem';
import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import TagViewItem from 'src/view/tag/view/TagViewItem';

export default [
  {
    name: 'reference',
    label: i18n('entities.product.fields.reference'),
    schema: schemas.integer(
      i18n('entities.product.fields.reference'),
      {
        required: true,
      },
    ),
  },
  {
    name: 'title',
    label: i18n('entities.product.fields.title'),
    schema: schemas.string(
      i18n('entities.product.fields.title'),
      {
        required: true,
        min: 1,
        max: 200,
      },
    ),
  },
  {
    name: 'description',
    label: i18n('entities.product.fields.description'),
    schema: schemas.string(
      i18n('entities.product.fields.description'),
      {
        required: true,
        min: 1,
        max: 1000,
      },
    ),
  },
  {
    name: 'category',
    label: i18n('entities.product.fields.category'),
    schema: schemas.relationToOne(
      i18n('entities.product.fields.category'),
      {
        required: true,
      },
    ),
    render: (value) => <ColorBadge label={value} />,
  },
  {
    name: 'website',
    label: i18n('entities.product.fields.website'),
    schema: schemas.string(
      i18n('entities.product.fields.website'),
      {
        required: true,
        max: 100,
        min: 1,
      },
    ),
  },
  {
    name: 'logo',
    label: i18n('entities.product.fields.logo'),
    schema: schemas.images(
      i18n('entities.product.fields.logo'),
      {
        required: true,
      },
    ),
  },
  {
    name: 'rating',
    label: i18n('entities.product.fields.rating'),
    schema: schemas.decimal(
      i18n('entities.product.fields.rating'),
      {
        max: 5,
        min: 0,
      },
    ),
    render: (value) => (
      <RatingListItem
        value={value}
        precision={0.1}
        showValue
      />
    ),
  },
  {
    name: 'price',
    label: i18n('entities.product.fields.price'),
    schema: schemas.integer(
      i18n('entities.product.fields.price'),
      {
        min: 0,
        max: 100,
      },
    ),
    render: (value) => <PriceListItem value={value} />,
  },
  {
    name: 'tags',
    label: i18n('entities.product.fields.tags'),
    schema: schemas.relationToMany(
      i18n('entities.product.fields.tags'),
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
