import { Icon } from '@mui/material';
import { useEffect, useState } from 'react';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import lightColors from 'src/mui/assets/theme/base/colors';
import darkColors from 'src/mui/assets/theme-dark/base/colors';
import MDBox from 'src/mui/components/MDBox';

const ScrollTop = () => {
  const { darkMode } = selectMuiSettings();

  const [showScroll, setShowScroll] = useState(false);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const checkScrollTop = () => {
      if (window.pageYOffset > 400) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);

    return () =>
      window.removeEventListener('scroll', checkScrollTop);
  }, []);

  return (
    <MDBox
      display={showScroll ? 'flex' : 'none'}
      justifyContent="center"
      alignItems="center"
      width="2.6rem"
      height="2.6rem"
      bgColor={
        darkMode
          ? darkColors.dark.main
          : lightColors.white.main
      }
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="5rem"
      bottom="1.6rem"
      zIndex={99}
      color="text"
      sx={{ cursor: 'pointer' }}
      onClick={scrollTop}
    >
      <Icon fontSize="medium" color="inherit">
        keyboard_arrow_up
      </Icon>
    </MDBox>
  );
};

export default ScrollTop;
