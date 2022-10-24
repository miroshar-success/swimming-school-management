import { i18n } from 'src/i18n';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';

function OutOf({ value, precision, total }) {
  const resultPrecision = /\.(\d+)$/.exec(`${precision}`);
  const count =
    (resultPrecision && resultPrecision[1].length) || 0;
  return (
    <MDTypography variant="body2" fontWeight="bold">
      {Number(value ?? 0).toFixed(count)}
      <MDTypography
        color="text"
        component="span"
        fontWeight="regular"
        variant="body2"
      >
        {i18n('common.outOf')}
      </MDTypography>
      {Number(total).toFixed(count)}
    </MDTypography>
  );
}

OutOf.defaultProps = {
  precision: 1,
};

OutOf.propTypes = {
  precision: PropTypes.number,
  total: PropTypes.number.isRequired,
  value: PropTypes.number,
};

export default OutOf;
