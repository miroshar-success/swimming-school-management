// @mui material components
import { Theme } from '@mui/material/styles';

function timelineItem(theme: Theme, ownerState: any) {
  const { borders, palette } = theme;
  const { lastItem, isDark, isHover, ...rest } = ownerState;

  const { borderWidth, borderColor } = borders;

  return {
    '&': {
      cursor: isHover ? 'pointer' : null,
    },
    '&:hover': {
      backgroundColor: isHover
        ? isDark
          ? palette.grey[800]
          : palette.grey[200]
        : null,
    },
    '&:after': {
      content: !lastItem && "''",
      position: 'absolute',
      top: '1.6rem',
      left: '13.6px',
      height: '100%',
      opacity: isDark ? 0.1 : 1,
      borderRight: `${borderWidth[2]} solid ${borderColor}`,
      ...rest,
    },
  };
}

export default timelineItem;
