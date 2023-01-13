import React from 'react';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import ToolbarWrapper from 'src/view/shared/styles/ToolbarWrapper';
import { useSelector } from 'react-redux';
import adminSelectors from 'src/modules/admin/adminSelectors';
import selectors from 'src/modules/admin/view/adminViewSelectors';
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
  const hasPermissionToEdit = useSelector(
    adminSelectors.selectPermissionToEdit,
  );

  const id = match.params.id;

  return (
    <ToolbarWrapper>
      {hasPermissionToEdit && (
        <MDButton
          component={Link}
          to={`/admin/admin/${id}/edit`}
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

export default AdminViewToolbar;
