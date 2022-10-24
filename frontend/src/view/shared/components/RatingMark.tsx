import Color from 'color';
import Colors from 'src/view/shared/theme/Colors';
import GradeIcon from '@mui/icons-material/Grade';
import MDBox from 'src/mui/components/MDBox';
import PropTypes from 'prop-types';
import MDTypography from 'src/mui/components/MDTypography';

function getForeColor(color) {
  if (!color) {
    return null;
  }
  return Color(color).mix(Color('black'), 0.3).hex();
}

function getBackColor(color) {
  if (!color) {
    return null;
  }
  return Color(color).mix(Color('white'), 0.75).hex();
}

function RatingMark(props) {
  const { color, icon, orientation, precision, rating } =
    props;
  const resultPrecision = /\.(\d+)$/.exec(precision);
  const mainColor = Colors(color);
  const backColor = getBackColor(mainColor);
  const foreColor = getForeColor(mainColor);
  const position = { [orientation]: 0, pl: 0, pr: 0 };
  if (orientation === 'left') {
    position.pl = 0.8;
  }
  if (orientation === 'right') {
    position.pr = 0.8;
  }
  return (
    <MDBox
      display="flex"
      bgColor={backColor}
      color={foreColor}
      alignItems="center"
      justifyContent="center"
      lineHeight={0}
      position="absolute"
      {...position}
      zIndex="+99"
    >
      {orientation === 'right' && (
        <MDBox
          ml="-10px"
          borderTop={`15px solid ${backColor}`}
          borderRight={`5px solid ${backColor}`}
          borderBottom={`15px solid ${backColor}`}
          borderLeft="10px solid transparent"
        />
      )}
      {icon}
      <MDTypography
        variant="body2"
        fontWeight="bold"
        color="inherit"
        lineHeight="29px"
        mt="1px"
        px={0.4}
      >
        {Number(rating).toFixed(
          (resultPrecision && resultPrecision[1]?.length) ||
            0,
        )}
      </MDTypography>
      {orientation === 'left' && (
        <MDBox
          mr="-10px"
          borderTop={`15px solid ${backColor}`}
          borderRight="10px solid transparent"
          borderBottom={`15px solid ${backColor}`}
          borderLeft={`5px solid ${backColor}`}
        />
      )}
    </MDBox>
  );
}

RatingMark.defaultProps = {
  color: 'warning',
  icon: <GradeIcon />,
  orientation: 'left',
  precision: 1,
  rating: 0,
};

RatingMark.propTypes = {
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

export default RatingMark;
