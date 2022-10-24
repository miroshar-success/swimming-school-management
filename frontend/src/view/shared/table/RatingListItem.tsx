import MDBox from 'src/mui/components/MDBox';
import OutOf from 'src/view/shared/components/OutOf';
import PropTypes from 'prop-types';
import StyledRating from 'src/view/shared/styles/StyledRating';

function RatingListItem(props) {
  const {
    allowHalf,
    color,
    count,
    defaultValue,
    emptyIcon,
    hiddenLabel,
    icon,
    label,
    precision,
    showValue,
    size,
    value,
  } = props;
  return (
    <MDBox lineHeight={0}>
      <MDBox display="flex" alignItems="center" gap={0.8}>
        <StyledRating
          defaultValue={defaultValue}
          value={value}
          icon={icon}
          emptyIcon={icon || emptyIcon}
          max={count}
          precision={precision || (allowHalf ? 0.5 : 1)}
          ownerState={{
            color,
          }}
          size={size}
          readOnly
        />
        {showValue && (
          <OutOf
            precision={precision || (allowHalf ? 0.5 : 1)}
            total={count}
            value={value}
          />
        )}
      </MDBox>
    </MDBox>
  );
}

RatingListItem.defaultProps = {
  allowHalf: false,
  color: null,
  count: 5,
  defaultValue: 0,
  precision: 0,
  showValue: false,
  size: 'small',
};

RatingListItem.propTypes = {
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
  emptyIcon: PropTypes.any,
  icon: PropTypes.any,
  label: PropTypes.string,
  precision: PropTypes.number,
  showValue: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  value: PropTypes.number,
};

export default RatingListItem;
