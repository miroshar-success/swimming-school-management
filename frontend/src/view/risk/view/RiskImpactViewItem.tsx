import PropTypes from 'prop-types';
import riskEnumerators from 'src/modules/risk/riskEnumerators';
import EnumColorBadgeViewItem from 'src/view/shared/view/EnumColorBadgeViewItem';

function RiskImpactViewItem(props) {
  const { value, label } = props;
  return (
    <EnumColorBadgeViewItem
      value={value}
      label={label}
      enums={riskEnumerators.impact}
      colors={riskEnumerators.impactColor}
      i18nPrefix="entities.risk.enumerators.impact"
    />
  );
}

RiskImpactViewItem.propsType = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default RiskImpactViewItem;
