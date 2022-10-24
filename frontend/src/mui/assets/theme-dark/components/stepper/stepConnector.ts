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
import borders from 'src/mui/assets/theme-dark/base/borders';
import colors from 'src/mui/assets/theme-dark/base/colors';

const { white } = colors;
const { borderWidth } = borders;

// types
type Types = any;

const stepConnector: Types = {
  styleOverrides: {
    root: {
      color: white.main,
      opacity: 0.5,
      transition: 'all 200ms linear',

      '&.Mui-active': {
        color: white.main,
        opacity: 1,
      },

      '&.Mui-completed': {
        color: white.main,
        opacity: 1,
      },
    },

    alternativeLabel: {
      top: '4.8px',
      left: 'calc(-50% + 5.2px)',
      right: 'calc(50% + 5.2px)',
    },

    line: {
      borderWidth: `${borderWidth[2]} !important`,
      borderColor: 'currentColor',
      opacity: 0.5,
    },
  },
};

export default stepConnector;
