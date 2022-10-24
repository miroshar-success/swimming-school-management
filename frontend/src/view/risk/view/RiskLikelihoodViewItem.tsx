import PropTypes from 'prop-types';
import riskEnumerators from 'src/modules/risk/riskEnumerators';
import EnumColorBadgeViewItem from 'src/view/shared/view/EnumColorBadgeViewItem';

function RiskLikelihoodViewItem(props) {
  const { value, label } = props;
  return (
    <EnumColorBadgeViewItem
      value={value}
      label={label}
      enums={riskEnumerators.likelihood}
      colors={riskEnumerators.likelihoodColor}
      i18nPrefix="entities.risk.enumerators.likelihood"
    />
  );
}

RiskLikelihoodViewItem.propsType = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default RiskLikelihoodViewItem;
