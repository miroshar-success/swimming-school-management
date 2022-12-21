import HistoryIcon from '@mui/icons-material/History';
import { i18n } from 'src/i18n';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ToolbarWrapper from 'src/view/shared/styles/ToolbarWrapper';
import MDButton from 'src/mui/components/MDButton';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';

function SettingsFormToolbar(props) {
  const { sidenavColor } = selectMuiSettings();

  return <ToolbarWrapper></ToolbarWrapper>;
}

export default SettingsFormToolbar;
