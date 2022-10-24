import { i18n } from 'src/i18n';
import ColorBadge from 'src/view/shared/components/ColorBadge';
import riskEnumerators from 'src/modules/risk/riskEnumerators';
import RiskImpactViewItem from 'src/view/risk/view/RiskImpactViewItem';
import RiskInherentScoreViewItem from 'src/view/risk/view/RiskInherentScoreViewItem';
import RiskLikelihoodViewItem from 'src/view/risk/view/RiskLikelihoodViewItem';
import RiskStatusViewItem from 'src/view/risk/view/RiskStatusViewItem';
import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import TagViewItem from 'src/view/tag/view/TagViewItem';

export default [
  {
    name: 'reference',
    label: i18n('entities.risk.fields.reference'),
    schema: schemas.integer(
      i18n('entities.risk.fields.reference'),
      {
        required: true,
      },
    ),
  },
  {
    name: 'title',
    label: i18n('entities.risk.fields.title'),
    schema: schemas.string(
      i18n('entities.risk.fields.title'),
      {
        required: true,
        min: 1,
        max: 250,
      },
    ),
  },
  {
    name: 'status',
    label: i18n('entities.risk.fields.status'),
    schema: schemas.enumerator(
      i18n('entities.risk.fields.status'),
      {
        required: true,
        options: riskEnumerators.status,
      },
    ),
    render: (value) => <RiskStatusViewItem value={value} />,
  },
  {
    name: 'owner',
    label: i18n('entities.risk.fields.owner'),
    schema: schemas.relationToOne(
      i18n('entities.risk.fields.owner'),
      {},
    ),
  },
  {
    name: 'description',
    label: i18n('entities.risk.fields.description'),
    schema: schemas.string(
      i18n('entities.risk.fields.description'),
      {
        max: 2500,
        min: 1,
      },
    ),
  },
  {
    name: 'category',
    label: i18n('entities.risk.fields.category'),
    schema: schemas.relationToOne(
      i18n('entities.risk.fields.category'),
      {
        required: true,
      },
    ),
    render: (value) => <ColorBadge label={value} />,
  },
  {
    name: 'likelihood',
    label: i18n('entities.risk.fields.likelihood'),
    schema: schemas.enumerator(
      i18n('entities.risk.fields.likelihood'),
      {
        required: true,
        options: riskEnumerators.likelihood,
      },
    ),
    render: (value) => (
      <RiskLikelihoodViewItem value={value} />
    ),
  },
  {
    name: 'impact',
    label: i18n('entities.risk.fields.impact'),
    schema: schemas.enumerator(
      i18n('entities.risk.fields.impact'),
      {
        required: true,
        options: riskEnumerators.impact,
      },
    ),
    render: (value) => <RiskImpactViewItem value={value} />,
  },
  {
    name: 'inherentScore',
    label: i18n('entities.risk.fields.inherentScore'),
    schema: schemas.enumerator(
      i18n('entities.risk.fields.inherentScore'),
      {
        required: true,
        options: riskEnumerators.inherentScore,
      },
    ),
    render: (value) => (
      <RiskInherentScoreViewItem value={value} />
    ),
  },
  {
    name: 'residualScore',
    label: i18n('entities.risk.fields.residualScore'),
    schema: schemas.integer(
      i18n('entities.risk.fields.residualScore'),
      {
        required: true,
      },
    ),
  },
  {
    name: 'cost',
    label: i18n('entities.risk.fields.cost'),
    schema: schemas.decimal(
      i18n('entities.risk.fields.cost'),
      {
        required: true,
      },
    ),
  },
  {
    name: 'tags',
    label: i18n('entities.risk.fields.tags'),
    schema: schemas.relationToMany(
      i18n('entities.risk.fields.tags'),
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
    name: 'notes',
    label: i18n('entities.risk.fields.notes'),
    schema: schemas.relationToMany(
      i18n('entities.risk.fields.notes'),
      {
        max: 50,
      },
    ),
  },
  {
    name: 'attachments',
    label: i18n('entities.risk.fields.attachments'),
    schema: schemas.files(
      i18n('entities.risk.fields.attachments'),
      {},
    ),
  },
  {
    name: 'tasks',
    label: i18n('entities.risk.fields.tasks'),
    schema: schemas.relationToMany(
      i18n('entities.risk.fields.tasks'),
      {},
    ),
  },
];
