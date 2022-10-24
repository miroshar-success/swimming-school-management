import PropTypes from 'prop-types';
import vendorEnumerators from 'src/modules/vendor/vendorEnumerators';
import EnumColorBadgeViewItem from 'src/view/shared/view/EnumColorBadgeViewItem';

function VendorStatusViewItem(props) {
  const { value, label } = props;
  return (
    <EnumColorBadgeViewItem
      value={value}
      label={label}
      enums={vendorEnumerators.status}
      colors={vendorEnumerators.statusColor}
      i18nPrefix="entities.vendor.enumerators.status"
    />
  );
}

VendorStatusViewItem.propsType = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default VendorStatusViewItem;
