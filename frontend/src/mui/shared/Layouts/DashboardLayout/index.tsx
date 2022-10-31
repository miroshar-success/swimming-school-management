import { Grid } from '@mui/material';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import authSelectors from 'src/modules/auth/authSelectors';
import MDBox from 'src/mui/components/MDBox';
import muiActions from 'src/modules/mui/muiActions';
import PermissionChecker from 'src/modules/auth/permissionChecker';

function DashboardLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const dispatch = useDispatch();
  const { miniSidenav } = selectMuiSettings();
  const { pathname } = useLocation();

  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );
  const currentUser = useSelector(
    authSelectors.selectCurrentUser,
  );

  useEffect(() => {
    dispatch(muiActions.doLayout('dashboard'));
  }, [pathname]);

  return (
    <MDBox
      sx={({
        breakpoints,
        transitions,
        functions: { pxToRem },
      }) => ({
        p: 2.4,
        position: 'relative',

        [breakpoints.up('xl')]: {
          marginLeft: miniSidenav
            ? pxToRem(96)
            : pxToRem(219.2),
          transition: transitions.create(
            ['margin-left', 'margin-right'],
            {
              easing: transitions.easing.easeInOut,
              duration: transitions.duration.standard,
            },
          ),
        },
      })}
    >
      {children}
    </MDBox>
  );
}

export default DashboardLayout;
