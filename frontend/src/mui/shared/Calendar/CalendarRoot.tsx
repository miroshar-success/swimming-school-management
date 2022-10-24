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
import Box from '@mui/material/Box';
import { styled, Theme } from '@mui/material/styles';

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
    const { darkMode } = ownerState;

    const {
      primary,
      white,
      dark,
      light,
      grey,
      gradients,
      info,
    } = palette;
    const {
      size,
      fontWeightMedium,
      fontWeightBold,
      fontWeightRegular,
      fontWeightLight,
    } = typography;
    const { linearGradient, pxToRem } = functions;
    const { md } = boxShadows;

    return {
      height: '100%',

      '& .fc-media-screen': {
        height: '100%',
        color: dark.main,
      },

      '& .fc-theme-standard .fc-scrollgrid': {
        border: 'none',
      },

      '& .fc-theme-standard thead tr th': {
        borderLeft: 'none',
        borderRight: 'none',
      },

      '& .fc-theme-standard td, .fc-theme-standard th': {
        borderColor: light.main,
      },

      '& .fc .fc-col-header': {
        width: '100% !important',
      },

      '& .fc .fc-daygrid-body.fc-daygrid-body-unbalanced': {
        width: '100% !important',
      },

      '& .fc .fc-daygrid-body .fc-scrollgrid-sync-table': {
        width: '100% !important',
      },

      '& .fc th': {
        textAlign: 'center',
      },

      '& .fc .fc-col-header-cell-cushion': {
        fontSize: size.sm,
        fontWeight: fontWeightMedium,
        color: darkMode ? white.main : grey[500],
      },

      '& .fc .fc-daygrid-day-number': {
        color: darkMode ? white.main : grey[700],
        fontSize: size.sm,
        fontWeight: fontWeightRegular,
        width: '100%',
        textAlign: 'center',
      },

      // '& .fc .fc-day-sun .fc-col-header-cell-cushion': {
      //   color: primary.main,
      // },

      // '& .fc .fc-day-sun .fc-daygrid-day-number': {
      //   color: primary.main,
      //   fontWeight: fontWeightMedium,
      // },

      '& .fc .fc-day-today .fc-daygrid-day-number': {
        fontWeight: fontWeightBold,
      },

      '& .fc .fc-daygrid-day.fc-day-past': {
        backgroundColor: darkMode ? grey[900] : grey[300],
      },

      '& .fc .fc-daygrid-day.fc-day-today': {
        backgroundColor: darkMode ? grey[700] : grey[200],
      },

      '.fc .fc-list-event:hover td': {
        backgroundColor: 'transparent',
      },

      '& .fc-scrollgrid-section.fc-scrollgrid-section-header > td':
        {
          border: 'none',
        },

      '& .fc-scrollgrid-section.fc-scrollgrid-section-body.fc-scrollgrid-section-liquid > td':
        {
          border: 'none',
        },

      '& .fc-scrollgrid-sync-table': {
        height: 'auto !important',
      },

      '& .fc .fc-view-harness-active > .fc-view': {
        position: 'static',
        height: '100%',
      },

      '& .fc .fc-scroller-liquid-absolute': {
        position: 'static',
      },

      '& .fc-daygrid-event': {
        margin: `${pxToRem(0.4)} ${pxToRem(1.6)}`,
        borderWidth: '1.6px',
        borderStyle: 'solid',
        borderRadius: pxToRem(4.48),
        fontSize: size.sm,
        fontWeight: fontWeightMedium,
      },

      '& .fc-timegrid-event': {
        borderWidth: '1.6px',
        borderStyle: 'solid',
      },

      '& .fc .fc-daygrid-body-unbalanced .fc-daygrid-day-events':
        {
          minHeight: pxToRem(25.6),
        },

      '& .fc .fc-event-title': {
        fontSize: `${size.xs} !important`,
        fontWeight: `${fontWeightRegular} !important`,
        padding: `${pxToRem(1.6)} ${pxToRem(
          3.84,
        )} ${pxToRem(1.5)} !important`,
      },

      '& .fc .fc-event-title span': {
        display: 'inline-block',
        float: 'left',
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        marginRight: '4px',
      },

      '& .fc .fc-event-title span:last-child': {
        marginRight: 0,
      },

      '& .fc .fc-button, .fc .fc-today-button, .fc .fc-button:disabled':
        {
          backgroundColor: `${info.main} !important`,
          borderColor: `${info.main} !important`,
          fontSize: `${size.sm} !important`,
          boxShadow: `${md} !important`,
          opacity: '1 !important',
          transition: `all 150ms ease-in`,
          textTransform: 'capitalize',

          '&:hover, &:focus, &:active': {
            transform: 'scale(1.02)',
            boxShadow: `${md} !important`,
            backgroundColor: `${info.main} !important`,
            borderColor: `${info.main} !important`,
          },
        },

      '& .fc .fc-button .fc-icon': {
        fontSize: size.sm,
      },

      '& .fc-toolbar-title': {
        fontSize: `${size.lg} !important`,
        fontWeight: `${fontWeightBold} !important`,
        color: darkMode ? white.main : dark.main,
      },

      '& .event-primary, .event-primary:hover': {
        backgroundImage: linearGradient(
          gradients.primary.main,
          gradients.primary.state,
        ),
        borderColor: 'transparent',
        '& *': { color: white.main },
      },

      '& .event-secondary, .event-secondary:hover': {
        backgroundImage: linearGradient(
          gradients.secondary.main,
          gradients.secondary.state,
        ),
        borderColor: 'transparent',
        '& *': { color: white.main },
      },

      '& .event-info, .event-info:hover': {
        backgroundImage: linearGradient(
          gradients.info.main,
          gradients.info.state,
        ),
        borderColor: 'transparent',
        '& *': { color: white.main },
      },

      '& .event-success, .event-success:hover': {
        backgroundImage: linearGradient(
          gradients.success.main,
          gradients.success.state,
        ),
        borderColor: 'transparent',
        '& *': { color: white.main },
      },

      '& .event-success-not-in-time, .event-success-not-in-time:hover':
        {
          backgroundImage: linearGradient(
            gradients.success.main,
            gradients.success.state,
          ),
          borderColor: 'red',
          '& *': { color: white.main },
        },

      '& .event-success-overdue, .event-success-overdue:hover':
        {
          backgroundImage: linearGradient(
            gradients.success.main,
            gradients.success.state,
          ),
          borderColor: 'orange',
          '& *': { color: white.main },
        },

      '& .event-warning, .event-warning:hover': {
        backgroundImage: linearGradient(
          gradients.warning.main,
          gradients.warning.state,
        ),
        borderColor: 'transparent',
        '& *': { color: white.main },
      },

      '& .event-error, .event-error:hover': {
        backgroundImage: linearGradient(
          gradients.error.main,
          gradients.error.state,
        ),
        borderColor: 'transparent',
        '& *': { color: white.main },
      },

      '& .event-light, .event-light:hover': {
        backgroundImage: linearGradient(
          gradients.light.main,
          gradients.light.state,
        ),
        borderColor: 'transparent',

        '& *': { color: dark.main },
      },

      '& .event-dark, .event-dark:hover': {
        backgroundImage: linearGradient(
          gradients.dark.main,
          gradients.dark.state,
        ),
        borderColor: 'transparent',
        '& *': { color: white.main },
      },

      '& .event-red, .event-red:hover': {
        backgroundColor: '#ea4335',
        borderColor: '#ea4335',
        '& *': { color: white.main },
      },

      '& .event-orange, .event-orange:hover': {
        backgroundColor: '#ff7b25',
        borderColor: '#ff7b25',
        '& *': { color: white.main },
      },

      '& .event-yellow, .event-yellow:hover': {
        backgroundColor: '#feb236',
        borderColor: '#feb236',
        '& *': { color: white.main },
      },

      '& .event-green, .event-green:hover': {
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
        '& *': { color: white.main },
      },

      '& .event-blue, .event-blue:hover': {
        backgroundColor: '#1A73E8',
        borderColor: '#1A73E8',
        '& *': { color: white.main },
      },

      '& .event-indigo, .event-indigo:hover': {
        backgroundColor: '#3f51b5',
        borderColor: '#3f51b5',
        '& *': { color: white.main },
      },

      '& .event-violet, .event-violet:hover': {
        backgroundColor: '#9c27b0',
        borderColor: '#9c27b0',
        '& *': { color: white.main },
      },
    };
  },
);
