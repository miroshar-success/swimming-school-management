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

// @mui material components
import { Button } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';

export default styled(Button)(
  ({
    theme,
    ownerState,
  }: {
    theme?: Theme;
    ownerState: any;
  }) => {
    const { palette, functions } = theme;
    const { color, size, iconOnly, circular } = ownerState;

    const { white, socialMediaColors } = palette;
    const { pxToRem } = functions;

    // backgroundColor value
    const backgroundColorValue = socialMediaColors[color]
      ? socialMediaColors[color].main
      : socialMediaColors.facebook.main;

    // styles for the button with circular={true}
    const circularStyles = () => ({
      borderRadius: '50%',
    });

    // styles for the button with iconOnly={true}
    const iconOnlyStyles = () => {
      // width, height, minWidth and minHeight values
      let sizeValue = pxToRem(30.4);

      if (size === 'small') {
        sizeValue = pxToRem(20.32);
      } else if (size === 'large') {
        sizeValue = pxToRem(41.6);
      }

      // padding value
      let paddingValue = `${pxToRem(8.8)} ${pxToRem(
        11,
      )} ${pxToRem(8)}`;

      if (size === 'small') {
        paddingValue = pxToRem(3.6);
      } else if (size === 'large') {
        paddingValue = pxToRem(12.8);
      }

      return {
        width: sizeValue,
        minWidth: sizeValue,
        height: sizeValue,
        minHeight: sizeValue,
        padding: paddingValue,
      };
    };

    return {
      backgroundColor: backgroundColorValue,
      color: white.main,
      boxShadow: 'none',

      '&:hover': {
        backgroundColor: backgroundColorValue,
        boxShadow: 'none',
      },

      '&:focus:not(:hover)': {
        backgroundColor: socialMediaColors[color]
          ? socialMediaColors[color].dark
          : socialMediaColors.facebook.dark,
        boxShadow: 'none',
      },

      '&:disabled': {
        backgroundColor: backgroundColorValue,
        color: white.main,
      },

      ...(circular && circularStyles()),
      ...(iconOnly && iconOnlyStyles()),
    };
  },
);
