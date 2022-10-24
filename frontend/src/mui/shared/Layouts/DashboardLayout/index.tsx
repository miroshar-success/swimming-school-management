import { Grid } from '@mui/material';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import authSelectors from 'src/modules/auth/authSelectors';
import MDBox from 'src/mui/components/MDBox';
import muiActions from 'src/modules/mui/muiActions';
import PermissionChecker from 'src/modules/auth/permissionChecker';
import QuizForm from 'src/view/widgets/TypeForm/QuizForm';

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

  const permissionChecker = new PermissionChecker(
    currentTenant,
    currentUser,
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
      {permissionChecker.needsAnswers && (
        <MDBox
          display="flex"
          alignItems="center"
          position="fixed"
          left="0"
          top="0"
          right="0"
          bottom="0"
          zIndex={10000}
          sx={{
            background: 'rgba(225,225,225,0.2)',
          }}
        >
          <Grid justifyContent="center" container>
            <Grid xl={7} lg={8} md={9} sm={11} xs={12} item>
              <QuizForm />
            </Grid>
          </Grid>
        </MDBox>
      )}
    </MDBox>
  );
}

export default DashboardLayout;
