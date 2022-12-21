import React from 'react';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import ToolbarWrapper from 'src/view/shared/styles/ToolbarWrapper';
import { useSelector } from 'react-redux';
import paymentSelectors from 'src/modules/payment/paymentSelectors';
import selectors from 'src/modules/student/view/studentViewSelectors';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import HistoryIcon from '@mui/icons-material/History';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MDButton from 'src/mui/components/MDButton';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';

function PaymentHistoryViewToolbar(props) {
  const { sidenavColor } = selectMuiSettings();
  const { match } = props;

  const student = useSelector(selectors.selectStudent);
  const hasPermissionToEdit = useSelector(
    paymentSelectors.selectPermissionToEdit,
  );

  const id = match.params.id;

  return (
    <ToolbarWrapper>
      {hasPermissionToEdit && (
        <MDButton
          component={Link}
          to={`/student/${id}/edit`}
          variant="gradient"
          color={sidenavColor}
          type="button"
          startIcon={<EditIcon />}
          size="small"
        >
          {i18n('common.edit')}
        </MDButton>
      )}
    </ToolbarWrapper>
  );
}

export default PaymentHistoryViewToolbar;
