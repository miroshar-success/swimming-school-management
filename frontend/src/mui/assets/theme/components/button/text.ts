/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 PRO React TS Base Styles
import colors from 'src/mui/assets/theme/base/colors';
import typography from 'src/mui/assets/theme/base/typography';

// Material Dashboard 2 PRO React TS Helper Functions
import pxToRem from 'src/mui/assets/theme/functions/pxToRem';

const { text, info, secondary, transparent } = colors;
const { size } = typography;

const buttonText = {
  base: {
    backgroundColor: transparent.main,
    minHeight: pxToRem(32),
    color: text.main,
    boxShadow: 'none',
    padding: `${pxToRem(8)} ${pxToRem(19.2)}`,

    '&:hover': {
      backgroundColor: transparent.main,
      boxShadow: 'none',
    },

    '&:focus': {
      boxShadow: 'none',
    },

    '&:active, &:active:focus, &:active:hover': {
      opacity: 0.85,
      boxShadow: 'none',
    },

    '&:disabled': {
      boxShadow: 'none',
    },

    '& .material-icon, .material-icons-round, svg': {
      fontSize: `${pxToRem(12.8)} !important`,
    },
  },

  small: {
    minHeight: pxToRem(25.6),
    padding: `${pxToRem(4.8)} ${pxToRem(12.8)}`,
    fontSize: size.xs,

    '& .material-icon, .material-icons-round, svg': {
      fontSize: `${pxToRem(9.6)} !important`,
    },
  },

  large: {
    minHeight: pxToRem(37.6),
    padding: `${pxToRem(9.6)} ${pxToRem(22.4)}`,
    fontSize: size.sm,

    '& .material-icon, .material-icons-round, svg': {
      fontSize: `${pxToRem(17.6)} !important`,
    },
  },

  primary: {
    color: info.main,

    '&:hover': {
      color: info.main,
    },

    '&:focus:not(:hover)': {
      color: info.focus,
      boxShadow: 'none',
    },
  },

  secondary: {
    color: secondary.main,

    '&:hover': {
      color: secondary.main,
    },

    '&:focus:not(:hover)': {
      color: secondary.focus,
      boxShadow: 'none',
    },
  },
};

export default buttonText;
