import { ConnectedRouter } from 'connected-react-router';
import {
  configureStore,
  getHistory,
} from 'src/modules/store';
import { useState, useEffect, useMemo } from 'react';
import { Provider, useDispatch } from 'react-redux';
import RoutesComponent from 'src/view/shared/routes/RoutesComponent';
import 'typeface-roboto';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Message from 'src/view/shared/message';
import {
  useLocation,
  useRouteMatch,
} from 'react-router-dom';

// @mui material components
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Material Dashboard 2 PRO React TS themes
import theme from 'src/mui/assets/theme';
import themeRTL from 'src/mui/assets/theme/theme-rtl';

// Material Dashboard 2 PRO React TS Dark Mode themes
import themeDark from 'src/mui/assets/theme-dark';
import themeDarkRTL from 'src/mui/assets/theme-dark/theme-rtl';

// RTL plugins
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// for MUI 2 Dashboard
import muiActions from 'src/modules/mui/muiActions';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import Menu from 'src/view/layout/Menu';
import Configurator from 'src/mui/shared/Configurator';
import { Icon } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';

import lightColors from 'src/mui/assets/theme/base/colors';
import darkColors from 'src/mui/assets/theme-dark/base/colors';
import ScrollTop from 'src/ScrollTop';

const store = configureStore();

export default function App(props) {
  return (
    <Provider store={store}>
      <AppWithRedux {...props} />
    </Provider>
  );
}

function AppWithRedux(props) {
  const { direction, darkMode } = selectMuiSettings();

  const [rtlCache, setRtlCache] = useState(null);

  // Cache for the rtl
  useMemo(() => {
    const pluginRtl: any = rtlPlugin;
    const cacheRtl = createCache({
      key: 'rtl',
      stylisPlugins: [pluginRtl],
    });

    setRtlCache(cacheRtl);
  }, []);

  return direction === 'rtl' ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider
        theme={darkMode ? themeDarkRTL : themeRTL}
      >
        <SnackbarProvider maxSnack={3}>
          <>
            <CssBaseline />
            <AppWithSnackbar {...props} />
          </>
        </SnackbarProvider>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <SnackbarProvider maxSnack={3}>
        <>
          <CssBaseline />
          <AppWithSnackbar {...props} />
        </>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

function AppWithSnackbar(props) {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // this is a little hack to not have to import notistack
    // on all the components that emit messages
    Message.registerNotistakEnqueueSnackbar(
      enqueueSnackbar,
    );
  }, [enqueueSnackbar]);

  const brandWhite = '/images/vor-light.svg';
  const brandDark = '/images/vor-dark.svg';

  const {
    miniSidenav,
    transparentSidenav,
    whiteSidenav,
    openConfigurator,
    sidenavColor,
    direction,
    layout,
    darkMode,
  } = selectMuiSettings();

  const dispatch = useDispatch();

  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      dispatch(muiActions.doMiniSidenav(false));
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      dispatch(muiActions.doMiniSidenav(true));
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () =>
    dispatch(
      muiActions.doOpenConfigurator(!openConfigurator),
    );

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute('dir', direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  useEffect(() => {
    document.documentElement.className = `${sidenavColor}-scrollbar`;
  }, [sidenavColor]);

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="2.6rem"
      height="2.6rem"
      bgColor={
        darkMode
          ? darkColors.dark.main
          : lightColors.white.main
      }
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="1.6rem"
      bottom="1.6rem"
      zIndex={99}
      color="text"
      sx={{ cursor: 'pointer' }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  const match = useRouteMatch();

  return (
    <ConnectedRouter history={getHistory()}>
      {layout === 'dashboard' && (
        <>
          <Menu
            url={match.url}
            brand={
              (transparentSidenav && !darkMode) ||
              whiteSidenav
                ? brandDark
                : brandWhite
            }
            brandName={i18n('app.title')}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === 'vr' && <Configurator />}
      <RoutesComponent />
      <ScrollTop />
    </ConnectedRouter>
  );
}
