// Material Dashboard 2 PRO React TS Base Styles
import colors from 'src/mui/assets/theme-dark/base/colors';
import borders from 'src/mui/assets/theme-dark/base/borders';
import boxShadows from 'src/mui/assets/theme-dark/base/boxShadows';

// Material Dashboard 2 PRO React Helper Function
import rgba from 'src/mui/assets/theme-dark/functions/rgba';
import pxToRem from 'src/mui/assets/theme-dark/functions/pxToRem';

const { black, background } = colors;
const { borderWidth, borderRadius } = borders;
const { md } = boxShadows;

// types
type Types = any;

const chip: Types = {
  styleOverrides: {
    root: {
      fontSize: '0.65rem',
      lineHeight: 1.3,
    },
    '& .MuiChip-label.MuiChip-labelSmall': {
      paddingLeft: pxToRem(6.4),
      paddingRight: pxToRem(6.4),
    },
  },
};

export default chip;
