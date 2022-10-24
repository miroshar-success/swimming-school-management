import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { GRID_MODE } from 'src/modules/types';

const selectRaw = (state) => state.mui;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const selectMiniSidenav = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.miniSidenav),
);

const selectTransparentSidenav = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.transparentSidenav),
);

const selectWhiteSidenav = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.whiteSidenav),
);

const selectSidenavColor = createSelector(
  [selectRaw],
  (raw) => raw.sidenavColor,
);

const selectTransparentNavbar = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.transparentNavbar),
);

const selectFixedNavbar = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.fixedNavbar),
);

const selectOpenConfigurator = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.openConfigurator),
);

const selectDirection = createSelector(
  [selectRaw],
  (raw) => raw.direction,
);

const selectLayout = createSelector(
  [selectRaw],
  (raw) => raw.layout,
);

const selectDarkMode = createSelector([selectRaw], (raw) =>
  Boolean(raw.darkMode),
);

const selectViewModes = createSelector(
  [selectRaw],
  (raw) => raw.viewModes || [],
);

const selectViewMode = createSelector(
  (state) => selectViewModes(state),
  (_, section) => section,
  (viewModes, section) =>
    viewModes.find((vm) => vm.section === section)
      ?.viewMode || GRID_MODE,
);

const selectGridHeights = createSelector(
  [selectRaw],
  (raw) => raw.gridHeights,
);

const muiSelectors = {
  selectRaw,
  selectLoading,
  selectMiniSidenav,
  selectTransparentSidenav,
  selectWhiteSidenav,
  selectSidenavColor,
  selectTransparentNavbar,
  selectFixedNavbar,
  selectOpenConfigurator,
  selectDirection,
  selectLayout,
  selectDarkMode,
  selectViewModes,
  selectViewMode,
  selectGridHeights,
};

export default muiSelectors;

export function selectMuiSettings(section = '') {
  return {
    miniSidenav: useSelector(
      muiSelectors.selectMiniSidenav,
    ),
    transparentSidenav: useSelector(
      muiSelectors.selectTransparentSidenav,
    ),
    whiteSidenav: useSelector(
      muiSelectors.selectWhiteSidenav,
    ),
    sidenavColor: useSelector(
      muiSelectors.selectSidenavColor,
    ),
    transparentNavbar: useSelector(
      muiSelectors.selectTransparentNavbar,
    ),
    fixedNavbar: useSelector(
      muiSelectors.selectFixedNavbar,
    ),
    openConfigurator: useSelector(
      muiSelectors.selectOpenConfigurator,
    ),
    direction: useSelector(muiSelectors.selectDirection),
    layout: useSelector(muiSelectors.selectLayout),
    darkMode: useSelector(muiSelectors.selectDarkMode),
    viewMode: useSelector((state) =>
      muiSelectors.selectViewMode(state, section),
    ),
    viewModes: useSelector(muiSelectors.selectViewModes),
    gridHeights: useSelector(
      muiSelectors.selectGridHeights,
    ),
  };
}
