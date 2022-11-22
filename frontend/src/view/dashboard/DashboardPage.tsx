import { useSelector } from 'react-redux';
import authSelectors from 'src/modules/auth/authSelectors';
import Grid from '@mui/material/Grid';
import PermissionChecker from 'src/modules/auth/permissionChecker';

function DashboardPage(props) {
  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );
  const currentUser = useSelector(
    authSelectors.selectCurrentUser,
  );

  const permissionChecker = new PermissionChecker(
    currentTenant,
    currentUser,
  );
  return <></>;
}

export default DashboardPage;
