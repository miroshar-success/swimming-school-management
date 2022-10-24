import PropTypes from 'prop-types';
import riskEnumerators from 'src/modules/risk/riskEnumerators';
import EnumColorBadgeViewItem from 'src/view/shared/view/EnumColorBadgeViewItem';

function RiskInherentScoreViewItem(props) {
  const { value, label } = props;
  return (
    <EnumColorBadgeViewItem
      value={value}
      label={label}
      enums={riskEnumerators.inherentScore}
      colors={riskEnumerators.inherentScoreColor}
      i18nPrefix="entities.risk.enumerators.inherentScore"
    />
  );
}

RiskInherentScoreViewItem.propsType = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default RiskInherentScoreViewItem;
