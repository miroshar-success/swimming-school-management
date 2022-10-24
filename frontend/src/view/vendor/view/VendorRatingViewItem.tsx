import PropTypes from 'prop-types';
import vendorEnumerators from 'src/modules/vendor/vendorEnumerators';
import EnumColorBadgeViewItem from 'src/view/shared/view/EnumColorBadgeViewItem';

function VendorRatingViewItem(props) {
  const { value, label } = props;
  return (
    <EnumColorBadgeViewItem
      value={value}
      label={label}
      enums={vendorEnumerators.rating}
      colors={vendorEnumerators.ratingColor}
      i18nPrefix="entities.vendor.enumerators.rating"
    />
  );
}

VendorRatingViewItem.propsType = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default VendorRatingViewItem;
