import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PropTypes from 'prop-types';
import RatingListItem from 'src/view/shared/table/RatingListItem';

function PriceListItem(props) {
  return <RatingListItem {...props} />;
}

PriceListItem.defaultProps = {
  color: 'success',
  count: 4,
  icon: <AttachMoneyIcon />,
  precision: 0,
  showValue: false,
  size: 'small',
};

PriceListItem.propTypes = {
  allowHalf: PropTypes.bool,
  color: PropTypes.oneOf([
    null,
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
  ]),
  count: PropTypes.number,
  defaultValue: PropTypes.number,
  label: PropTypes.string,
  precision: PropTypes.number,
  showValue: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  value: PropTypes.number,
};

export default PriceListItem;
