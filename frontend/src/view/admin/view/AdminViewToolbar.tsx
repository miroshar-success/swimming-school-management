import React from 'react';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import ToolbarWrapper from 'src/view/shared/styles/ToolbarWrapper';
import { useSelector } from 'react-redux';
import adminSelectors from 'src/modules/admin/adminSelectors';
import selectors from 'src/modules/admin/view/adminViewSelectors';
import auditLogSelectors from 'src/modules/auditLog/auditLogSelectors';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import HistoryIcon from '@mui/icons-material/History';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MDButton from 'src/mui/components/MDButton';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';

function AdminViewToolbar(props) {
  const { sidenavColor } = selectMuiSettings();
  const { match } = props;

  const admin = useSelector(selectors.selectAdmin);
  const hasPermissionToAuditLogs = useSelector(
    auditLogSelectors.selectPermissionToRead,
  );
  const hasPermissionToEdit = useSelector(
    adminSelectors.selectPermissionToEdit,
  );

  const id = match.params.id;

  return (
    <ToolbarWrapper>
      {hasPermissionToEdit && (
        <MDButton
          component={Link}
          to={`/admin/${id}/edit`}
          variant="gradient"
          color={sidenavColor}
          type="button"
          startIcon={<EditIcon />}
          size="small"
        >
          {i18n('common.edit')}
        </MDButton>
      )}

      {hasPermissionToAuditLogs && (
        <MDButton
          component={Link}
          to={`/audit-log?entityId=${encodeURIComponent(
            id,
          )}`}
          color={sidenavColor}
          variant="outlined"
          startIcon={<HistoryIcon />}
          size="small"
        >
          {i18n('auditLog.menu')}
        </MDButton>
      )}

      {admin && admin.email && hasPermissionToAuditLogs && (
        <MDButton
          component={Link}
          type="button"
          color={sidenavColor}
          variant="outlined"
          to={`/audit-log?createdByEmail=${encodeURIComponent(
            admin.email,
          )}`}
          startIcon={<VisibilityIcon />}
          size="small"
        >
          {i18n('admin.view.activity')}
        </MDButton>
      )}
    </ToolbarWrapper>
  );
}

export default AdminViewToolbar;
