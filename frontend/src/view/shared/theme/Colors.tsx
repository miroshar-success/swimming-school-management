import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import lColors from 'src/mui/assets/theme/base/colors';
import dColors from 'src/mui/assets/theme-dark/base/colors';
import rgba from 'src/mui/assets/theme/functions/rgba';

function Colors(color = null, opacity = null) {
  const { darkMode } = selectMuiSettings();
  const colors = darkMode ? dColors : lColors;
  if (colors[color]) {
    if (opacity !== null) {
      return rgba(colors[color].main, opacity);
    }
    return colors[color].main;
  }
  return colors;
}

export default Colors;
