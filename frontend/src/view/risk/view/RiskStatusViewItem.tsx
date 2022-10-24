import PropTypes from 'prop-types';
import riskEnumerators from 'src/modules/risk/riskEnumerators';
import EnumColorBadgeViewItem from 'src/view/shared/view/EnumColorBadgeViewItem';

function RiskStatusViewItem(props) {
  const { value, label } = props;
  return (
    <EnumColorBadgeViewItem
      value={value}
      label={label}
      enums={riskEnumerators.status}
      colors={riskEnumerators.statusColor}
      i18nPrefix="entities.risk.enumerators.status"
    />
  );
}

RiskStatusViewItem.propsType = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default RiskStatusViewItem;
