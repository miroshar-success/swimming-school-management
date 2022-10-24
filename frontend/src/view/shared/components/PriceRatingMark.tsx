import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PropTypes from 'prop-types';
import RatingMark from 'src/view/shared/components/RatingMark';

function PriceRatingMark(props) {
  return <RatingMark {...props} />;
}

PriceRatingMark.defaultProps = {
  color: 'success',
  icon: <AttachMoneyIcon />,
  orientation: 'right',
  precision: 1,
  rating: 0,
};

PriceRatingMark.propTypes = {
  color: PropTypes.oneOf([
    null,
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
  ]),
  icon: PropTypes.any,
  orientation: PropTypes.oneOf(['left', 'right']),
  precision: PropTypes.number,
  rating: PropTypes.number,
};

export default PriceRatingMark;
