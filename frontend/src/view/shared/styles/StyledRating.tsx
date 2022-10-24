import { Rating, styled, Theme } from '@mui/material';
import { TThemeColor } from 'src/modules/types';

const StyledRating = styled(Rating)(
  ({
    theme,
    ownerState,
  }: {
    theme?: Theme;
    ownerState: {
      color: null | TThemeColor;
    };
  }) => {
    const color = theme.palette[ownerState.color]?.main;
    if (!color) {
      return {};
    }
    return {
      '& .MuiRating-iconFilled, .MuiRating-iconHover': {
        color: color,
      },
    };
  },
);

export default StyledRating;
