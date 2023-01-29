import authSelectors from 'src/modules/auth/authSelectors';
import authActions from 'src/modules/auth/authActions';
import { useDispatch, useSelector } from 'react-redux';
import PermissionChecker from 'src/modules/auth/permissionChecker';
import layoutSelectors from 'src/modules/layout/layoutSelectors';
import { studentRoutes } from 'src/view/menus';

import { useEffect, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';

// react-router-dom components
import { useLocation, NavLink } from 'react-router-dom';

// @mui material components
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Icon from '@mui/material/Icon';
import ImagesUploader from 'src/view/shared/uploaders/ImagesUploader';
import * as yup from 'yup';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

// Material Dashboard 2 PRO React TS examples components
import SidenavCollapse from 'src/mui/shared/Sidenav/SidenavCollapse';
import SidenavList from 'src/mui/shared/Sidenav/SidenavList';
import SidenavItem from 'src/mui/shared/Sidenav/SidenavItem';
import Storage from 'src/security/storage';
import { i18n } from 'src/i18n';

// Custom styles for the Sidenav
import SidenavRoot from 'src/mui/shared/Sidenav/SidenavRoot';

// for MUI 2 Dashboard
import muiActions from 'src/modules/mui/muiActions';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import { findRoute, matchedRoutes } from 'src/view/routes';
import { Avatar, CardMedia } from '@mui/material';
import config from 'src/config';
import { BrandLogo } from 'src/assets/resources';

import Scrollbar from 'react-smooth-scrollbar-z';
import ImagesFormItem from 'src/view/shared/form/items/ImagesFormItem';

// Declaring props types for Sidenav
interface Props {
  [key: string]: any;
}

const schema = yup.object().shape({
  avatars: yupFormSchemas.images(
    i18n('user.fields.avatars'),
    {
      max: 1,
    },
  ),
});

function StudentMenu({ ...rest }: Props): JSX.Element {
  const dispatch = useDispatch();

  const darkMode = false;
  const sidenavColor = 'info';
  const whiteSidenav = false;
  const miniSidenav = false;
  const transparentSidenav = false;

  const color = sidenavColor;

  const [openCollapse, setOpenCollapse] = useState<
    boolean | string
  >(false);
  const [openNestedCollapse, setOpenNestedCollapse] =
    useState<boolean | string>(false);
  const location = useLocation();
  const { pathname } = location;
  const currentRoutes = matchedRoutes(pathname);
  const currentRoute = findRoute(pathname, currentRoutes);
  const collapseName =
    (currentRoute && currentRoute.collapseName) || false;
  const items = pathname.split('/').slice(1);
  const itemParentName = items[1];
  const itemName = items[items.length - 1];

  let textColor:
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'dark'
    | 'white'
    | 'inherit'
    | 'text'
    | 'light' = 'white';

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = 'dark';
  } else if (whiteSidenav && darkMode) {
    textColor = 'inherit';
  }

  const userText = useSelector(
    authSelectors.selectCurrentUserNameOrEmailPrefix,
  );
  const userAvatar = useSelector(
    authSelectors.selectCurrentUserAvatar,
  );

  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );
  const currentUser = useSelector(
    authSelectors.selectCurrentUser,
  );
  const [initialValues] = useState(() => {
    const record = currentUser || {};

    return {
      avatars: record.avatars || [],
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {
    dispatch(authActions.doUpdateProfile(values));
  };

  const menuVisible = useSelector(
    layoutSelectors.selectMenuVisible,
  );

  const permissionChecker = new PermissionChecker(
    currentTenant,
    currentUser,
  );

  const match = (permission) => {
    return permissionChecker.match(permission);
  };

  const doSignout = () => {
    dispatch(authActions.doSignout());
  };

  const lockedForCurrentPlan = (permission) => {
    return permissionChecker.lockedForCurrentPlan(
      permission,
    );
  };

  useEffect(() => {
    setOpenCollapse(collapseName);
    setOpenNestedCollapse(itemParentName);
  }, [collapseName, itemParentName]);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      dispatch(
        muiActions.doMiniSidenav(
          window.innerWidth < 1200 || miniSidenav,
        ),
      );
      dispatch(
        muiActions.doTransparentSidenav(
          window.innerWidth < 1200
            ? false
            : transparentSidenav,
        ),
      );
      dispatch(
        muiActions.doWhiteSidenav(
          window.innerWidth < 1200 ? false : whiteSidenav,
        ),
      );
    }

    /**
     * The event listener that's calling the handleMiniSidenav function when resizing the window.
     */
    window.addEventListener('resize', handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () =>
      window.removeEventListener(
        'resize',
        handleMiniSidenav,
      );
  }, [
    dispatch,
    pathname,
    transparentSidenav,
    whiteSidenav,
  ]);

  const renderAvailable = (permissionRequired) => {
    return {
      visible: match(permissionRequired),
      disabled: lockedForCurrentPlan(permissionRequired),
    };
  };

  // Render all the nested collapse items from the routes.js
  const renderNestedCollapse = (collapse: any) =>
    collapse.map(
      ({
        name,
        path,
        key,
        href,
        permissionRequired,
      }: any) => {
        const { visible, disabled } = renderAvailable(
          permissionRequired,
        );
        const active = !!findRoute(path, currentRoutes);
        if (!visible) {
          return null;
        }
        key = key || path;
        return href ? (
          <Link
            key={key}
            href={disabled ? '#' : href}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: 'none' }}
          >
            <SidenavItem
              name={name}
              disabled={disabled}
              nested
            />
          </Link>
        ) : (
          <NavLink
            to={disabled ? '#' : path}
            disabled={disabled}
            key={key}
            style={{ textDecoration: 'none' }}
          >
            <SidenavItem
              name={name}
              active={active}
              disabled={disabled}
              nested
            />
          </NavLink>
        );
      },
    );

  // Render the all the collpases from the routes.js
  const renderCollapse = (collapses: any) =>
    collapses.map(
      ({
        name,
        collapse,
        path,
        href,
        key,
        icon,
        permissionRequired,
      }: any) => {
        const { visible, disabled } = renderAvailable(
          permissionRequired,
        );
        const active = !!findRoute(path, currentRoutes);
        if (!visible) {
          return null;
        }

        key = key || path;

        let returnValue;

        if (collapse) {
          returnValue = (
            <SidenavItem
              disabled={disabled}
              key={key}
              color={color}
              name={name}
              active={
                key === itemParentName ? 'isParent' : false
              }
              open={openNestedCollapse === key}
              onClick={({ currentTarget }: any) =>
                openNestedCollapse === key &&
                currentTarget.classList.contains(
                  'MuiListItem-root',
                )
                  ? setOpenNestedCollapse(false)
                  : setOpenNestedCollapse(key)
              }
            >
              {renderNestedCollapse(collapse)}
            </SidenavItem>
          );
        } else {
          returnValue = href ? (
            <Link
              href={disabled ? '#' : href}
              key={key}
              target="_blank"
              rel="noreferrer"
              sx={{ textDecoration: 'none' }}
            >
              <SidenavItem
                color={color}
                name={name}
                active={active}
                icon={icon}
                disabled={disabled}
              />
            </Link>
          ) : (
            <NavLink
              to={disabled ? '#' : path}
              key={key}
              style={{ textDecoration: 'none' }}
            >
              <SidenavItem
                color={color}
                name={name}
                active={active}
                icon={icon}
                disabled={disabled}
              />
            </NavLink>
          );
        }
        return (
          <SidenavList key={key}>{returnValue}</SidenavList>
        );
      },
    );

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = (routes) =>
    routes.map(
      ({
        type,
        name,
        icon,
        title,
        collapse,
        noCollapse,
        key,
        href,
        path,
        permissionRequired,
      }: any) => {
        const { visible, disabled } = renderAvailable(
          permissionRequired,
        );
        const active = !!findRoute(path, currentRoutes);
        if (!visible) {
          return null;
        }

        key = key || path;

        let returnValue;

        noCollapse = noCollapse || !collapse;

        if (type === 'collapse' || !type) {
          if (href) {
            returnValue = (
              <Link
                href={disabled ? '#' : href}
                key={key}
                target="_blank"
                rel="noreferrer"
                sx={{ textDecoration: 'none' }}
              >
                <SidenavCollapse
                  name={name}
                  icon={icon}
                  color={color}
                  active={key === collapseName}
                  noCollapse={noCollapse}
                  disabled={disabled}
                />
              </Link>
            );
          } else if (noCollapse && path) {
            returnValue = (
              <NavLink
                to={disabled ? '#' : path}
                key={key}
                disabled={disabled}
              >
                <SidenavCollapse
                  name={name}
                  icon={icon}
                  color={color}
                  noCollapse={noCollapse}
                  active={active}
                  disabled={disabled}
                >
                  {collapse
                    ? renderCollapse(collapse)
                    : null}
                </SidenavCollapse>
              </NavLink>
            );
          } else {
            returnValue = (
              <SidenavCollapse
                key={key}
                name={name}
                icon={icon}
                color={color}
                active={key === collapseName}
                open={openCollapse === key}
                disabled={disabled}
                onClick={() =>
                  openCollapse === key
                    ? setOpenCollapse(false)
                    : setOpenCollapse(key)
                }
              >
                {collapse ? renderCollapse(collapse) : null}
              </SidenavCollapse>
            );
          }
        } else if (type === 'title') {
          returnValue = (
            <MDTypography
              key={key}
              color={textColor}
              display="block"
              variant="caption"
              fontWeight="bold"
              textTransform="uppercase"
              pl={2.4}
              mt={1.6}
              mb={0.8}
              ml={0.8}
            >
              {title}
            </MDTypography>
          );
        } else if (type === 'divider') {
          returnValue = (
            <Divider
              key={key}
              light={
                (!darkMode &&
                  !whiteSidenav &&
                  !transparentSidenav) ||
                (darkMode &&
                  !transparentSidenav &&
                  whiteSidenav)
              }
            />
          );
        }

        return returnValue;
      },
    );

  return (
    <>
      <SidenavRoot
        {...rest}
        variant="permanent"
        ownerState={{
          transparentSidenav,
          whiteSidenav,
          miniSidenav,
          darkMode,
        }}
      >
        <MDBox py={2.4}>
          <FormProvider {...form}>
            <MDBox
              textAlign="center"
              component="form"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <ImagesFormItem
                name="avatars"
                storage={Storage.values.userAvatarsProfiles}
                max={1}
                hideButtons={true}
                onChange={form.handleSubmit(onSubmit)}
              />
              <MDTypography color="white" sx={{ mt: 1 }}>
                {userText}
              </MDTypography>
            </MDBox>
          </FormProvider>
          <Divider key="divider-0" light={true} />
          <List>{renderRoutes([, ...studentRoutes])}</List>
          <NavLink to={'/'}>
            <SidenavCollapse
              icon={<Icon>exit_to_app</Icon>}
              name={i18n('auth.signout')}
              onClick={doSignout}
              noCollapse
            />
          </NavLink>
        </MDBox>
      </SidenavRoot>
    </>
  );
}

export default StudentMenu;
