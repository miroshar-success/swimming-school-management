import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import Color from 'color';
import Colors from 'src/view/shared/theme/Colors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';

export function getColorBadgeFore(color) {
  if (!color) {
    return null;
  }
  return Color(color).mix(Color('black'), 0.3).hex();
}

export function getColorBadgeBack(color) {
  if (!color) {
    return null;
  }
  return Color(color).mix(Color('white'), 0.75).hex();
}

function ColorBadge(props) {
  const { sidenavColor } = selectMuiSettings();
  const { color, label, onDelete } = props;
  const defaultColor = Colors(sidenavColor);
  const backColor = getColorBadgeBack(
    color || defaultColor,
  );
  const foreColor = getColorBadgeFore(
    color || defaultColor,
  );
  return (
    <MDBox
      display="inline-block"
      lineHeight={0}
      maxWidth="100%"
    >
      <MDBox
        alignItems="center"
        bgColor={backColor}
        borderRadius="md"
        color={foreColor}
        display="flex"
        flexWrap="nowrap"
        gap={0.4}
        m={0}
        maxWidth="100%"
        px={0.8}
        py={0.7}
      >
        <MDTypography
          flexGrow={1}
          textTransform="uppercase"
          fontWeight="bold"
          fontSize="9.6px"
          color="inherit"
          letterSpacing={0.8}
          lineHeight={1}
          variant="caption"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {label}
        </MDTypography>
        {Boolean(onDelete) && (
          <MDBox
            bgColor={foreColor}
            borderRadius="100%"
            color={backColor}
            fontSize="10px"
            height="10px"
            lineHeight={0}
            onClick={onDelete}
            width="10px"
            sx={{
              cursor: 'pointer',
            }}
          >
            <ClearSharpIcon />
          </MDBox>
        )}
      </MDBox>
    </MDBox>
  );
}

ColorBadge.propTypes = {
  color: PropTypes.string,
  label: PropTypes.any.isRequired,
  onDelete: PropTypes.func,
};

export default ColorBadge;
