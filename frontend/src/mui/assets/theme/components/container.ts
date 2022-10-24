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
import breakpoints from 'src/mui/assets/theme/base/breakpoints';

// Material Dashboard 2 PRO React TS Helper Functions
import pxToRem from 'src/mui/assets/theme/functions/pxToRem';

// types
type Types = any;

const {
  values: { sm, md, lg, xl, xxl },
} = breakpoints;

const SM = `@media (min-width: ${sm}px)`;
const MD = `@media (min-width: ${md}px)`;
const LG = `@media (min-width: ${lg}px)`;
const XL = `@media (min-width: ${xl}px)`;
const XXL = `@media (min-width: ${xxl}px)`;

const sharedClasses = {
  paddingRight: `${pxToRem(19.2)} !important`,
  paddingLeft: `${pxToRem(19.2)} !important`,
  marginRight: 'auto !important',
  marginLeft: 'auto !important',
  width: '100% !important',
  position: 'relative',
};

const container: Types = {
  [SM]: {
    '.MuiContainer-root': {
      ...sharedClasses,
      maxWidth: '432px !important',
    },
  },
  [MD]: {
    '.MuiContainer-root': {
      ...sharedClasses,
      maxWidth: '576px !important',
    },
  },
  [LG]: {
    '.MuiContainer-root': {
      ...sharedClasses,
      maxWidth: '768px !important',
    },
  },
  [XL]: {
    '.MuiContainer-root': {
      ...sharedClasses,
      maxWidth: '912px !important',
    },
  },
  [XXL]: {
    '.MuiContainer-root': {
      ...sharedClasses,
      maxWidth: '1056px !important',
    },
  },
};

export default container;
