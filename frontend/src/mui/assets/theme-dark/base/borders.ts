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

/**
 * The base border styles for the Material Dashboard 2 PRO React TSUI Dashboard PRO Material.
 * You can add new border width, border color or border radius using this file.
 * You can customized the borders value for the entire Material Dashboard 2 PRO React TSUI Dashboard PRO Material using thie file.
 */

// Material Dashboard 2 PRO React TS Base Styles
import colors from 'src/mui/assets/theme-dark/base/colors';

// Material Dashboard 2 PRO React TS Helper Functions
import pxToRem from 'src/mui/assets/theme-dark/functions/pxToRem';
import rgba from 'src/mui/assets/theme-dark/functions/rgba';

const { white } = colors;

// types
interface Types {
  borderColor: string;
  borderWidth: {
    0: number;
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
  };
  borderRadius: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    section: string;
  };
}

const borders: Types = {
  borderColor: rgba(white.main, 0.4),

  borderWidth: {
    0: 0,
    1: pxToRem(0.8),
    2: pxToRem(1.6),
    3: pxToRem(2.4),
    4: pxToRem(3.2),
    5: pxToRem(4),
  },

  borderRadius: {
    xs: pxToRem(1.28),
    sm: pxToRem(1.6),
    md: pxToRem(4.8),
    lg: pxToRem(6.4),
    xl: pxToRem(9.6),
    xxl: pxToRem(12.8),
    section: pxToRem(128),
  },
};

export default borders;
