import { Grid } from '@mui/material';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumbs from 'src/mui/shared/Breadcrumbs';
import authSelectors from 'src/modules/auth/authSelectors';
import MDBox from 'src/mui/components/MDBox';
import muiActions from 'src/modules/mui/muiActions';
import PermissionChecker from 'src/modules/auth/permissionChecker';
import MDTypography from 'src/mui/components/MDTypography';

function StudentAreaLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const route = pathname.split('/').slice(1);

  useEffect(() => {
    dispatch(muiActions.doLayout('studentArea'));
  }, [pathname]);

  return (
    <MDBox
      sx={({ functions: { pxToRem } }) => ({
        p: 2.4,
        pt: 12,
        position: 'relative',
        marginLeft: pxToRem(219.2),
      })}
    >
      <MDTypography variant="h5">
        <Breadcrumbs
          icon="home"
          title={route[route.length - 1]}
          route={route}
          isStudentArea={true}
        />
      </MDTypography>
      <MDBox marginTop={4}>{children}</MDBox>
    </MDBox>
  );
}

export default StudentAreaLayout;
