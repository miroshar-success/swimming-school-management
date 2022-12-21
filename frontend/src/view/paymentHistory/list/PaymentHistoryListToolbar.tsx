import HistoryIcon from '@mui/icons-material/History';
import { i18n } from 'src/i18n';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import ToolbarWrapper from 'src/view/shared/styles/ToolbarWrapper';
import MDButton from 'src/mui/components/MDButton';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';

function PaymentHistoryToolbar(props) {
  const { sidenavColor } = selectMuiSettings();

  return <ToolbarWrapper></ToolbarWrapper>;
}

export default PaymentHistoryToolbar;
