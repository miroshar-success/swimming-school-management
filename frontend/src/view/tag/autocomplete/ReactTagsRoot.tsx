import { Box } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import darkColors from 'src/mui/assets/theme-dark/base/colors';
import lightColors from 'src/mui/assets/theme/base/colors';
import pxToRem from 'src/mui/assets/theme/functions/pxToRem';
import rgba from 'src/mui/assets/theme/functions/rgba';
import {
  getColorBadgeBack,
  getColorBadgeFore,
} from 'src/view/shared/components/ColorBadge';

export default styled(Box)(
  ({
    theme,
    ownerState,
  }: {
    theme?: Theme;
    ownerState: any;
  }) => {
    const { palette, typography, functions, boxShadows } =
      theme;
    const { white, grey } = palette;
    const { darkMode, sidenavColor } = ownerState;
    const colors = darkMode ? darkColors : lightColors;
    const color = colors[sidenavColor]?.main;
    return {
      '& .ReactTags__tags': {
        position: 'relative',
        display: 'inline-flex',
        flexWrap: 'wrap',
        width: '100%',
      },

      '& .ReactTags__clearAll': {
        cursor: 'pointer',
        padding: '10px',
        margin: '10px',
        background: '#f88d8d',
        color: '#fff',
        border: 'none',
      },

      /* Styles for the input */
      '& .ReactTags__tagInput': {
        flexGrow: 1,
      },

      '& .ReactTags__tagInput input.ReactTags__tagInputField':
        {
          background: 'none',
          margin: 0,
          fontSize: '11.2px',
          fontWeight: '400',
          border: 0,
          color: colors.text.main,
          width: '100%',
          // minWidth: '150px',
          outline: 'none',
          lineHeight: '1.4375rem',
          borderBottom: `1px solid ${rgba(
            colors.inputBorderColor,
            darkMode ? 0.6 : 1,
          )}`,
        },
      '& .ReactTags__tagInput input.ReactTags__tagInputField:focus':
        {
          marginBottom: '-1px',
          borderBottom: `2px solid ${color}`,
          transform: 'scaleX(1)',
          transition:
            'transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
        },
      '& .ReactTags__editInput': {
        borderRadius: '1px',
      },
      '& .ReactTags__editTagInput': {
        display: 'inline-flex',
      },

      /* Styles for selected tags */
      '& .ReactTags__selected': {
        display: 'inline-flex',
        flexWrap: 'wrap',
        gap: '0.3rem',
        lineHeight: 0,
        width: '100%',
      },
      '& .ReactTags__selected span.ReactTags__tag': {
        alignItems: 'center',
        background: getColorBadgeBack(color),
        borderRadius: pxToRem(4),
        color: getColorBadgeFore(color),
        display: 'inline-block',
        fontSize: '9.6px',
        fontWeight: 'bold',
        letterSpacing: '0.8px',
        lineHeight: 1,
        marginBottom: 'auto',
        maxWidth: '100%',
        overflow: 'hidden',
        padding: '6px 20px 6px 6px',
        position: 'relative',
        textOverflow: 'ellipsis',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      },
      '& .ReactTags__selected .ReactTags__remove': {
        background: getColorBadgeFore(color),
        borderRadius: '6px',
        color: getColorBadgeBack(color),
        cursor: 'pointer',
        display: 'block',
        fontSize: '12px',
        fontWeight: 'bold',
        height: '11px',
        lineHeight: 0,
        outline: 'none',
        position: 'absolute',
        right: '5px',
        top: '5px',
        width: '11px',
      },

      /* Styles for suggestions */
      '& .ReactTags__suggestions': {
        position: 'absolute',
        zIndex: 1200,
      },
      '& .ReactTags__suggestions ul': {
        background: colors.background.default,
        borderRadius: pxToRem(4),
        boxShadow: boxShadows.md,
        listStyleType: 'none',
        padding: pxToRem(4.8),
      },
      '& .ReactTags__suggestions li': {
        borderRadius: pxToRem(2),
        color: colors.text.main,
        fontSize: '0.8rem',
        fontWeight: 400,
        margin: '0',
        padding: '5px 10px',
        whiteSpace: 'nowrap',
      },
      '& .ReactTags__suggestions li mark': {
        background: 'none',
        color: color,
        fontWeight: 700,
        textDecoration: 'underline',
      },
      '& .ReactTags__suggestions ul li.ReactTags__activeSuggestion':
        {
          background: rgba(
            darkMode ? white.main : grey[500],
            0.25,
          ),
          cursor: 'pointer',
        },
      '& .ReactTags__remove': {
        border: 'none',
        cursor: 'pointer',
        background: 'none',
        color: 'white',
      },
    };
  },
);
