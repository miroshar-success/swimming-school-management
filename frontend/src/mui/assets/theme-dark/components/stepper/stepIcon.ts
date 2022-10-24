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
import colors from 'src/mui/assets/theme-dark/base/colors';

// Material Dashboard 2 PRO React TS Helper Functions
import pxToRem from 'src/mui/assets/theme-dark/functions/pxToRem';
import boxShadow from 'src/mui/assets/theme-dark/functions/boxShadow';

const { white } = colors;

// types
type Types = any;

const stepIcon: Types = {
  styleOverrides: {
    root: {
      background: white.main,
      fill: white.main,
      stroke: white.main,
      opacity: 0.5,
      strokeWidth: pxToRem(8),
      width: pxToRem(10.4),
      height: pxToRem(10.4),
      borderRadius: '50%',
      zIndex: 99,
      transition: 'all 200ms linear',

      '&.Mui-active': {
        background: white.main,
        fill: white.main,
        stroke: white.main,
        opacity: 1,
        borderColor: white.main,
        boxShadow: boxShadow([0, 0], [0, 2], white.main, 1),
      },

      '&.Mui-completed': {
        background: white.main,
        fill: white.main,
        stroke: white.main,
        opacity: 1,
        borderColor: white.main,
        boxShadow: boxShadow([0, 0], [0, 2], white.main, 1),
      },
    },
  },
};

export default stepIcon;
