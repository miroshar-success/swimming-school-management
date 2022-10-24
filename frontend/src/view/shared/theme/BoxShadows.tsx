import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import lBoxShadows from 'src/mui/assets/theme/base/boxShadows';
import dBoxShadows from 'src/mui/assets/theme-dark/base/boxShadows';

function BoxShadows(key) {
  const { darkMode } = selectMuiSettings();
  const boxShadows = darkMode ? dBoxShadows : lBoxShadows;
  if (boxShadows[key]) {
    return boxShadows[key];
  }
  return boxShadows;
}

export default BoxShadows;
