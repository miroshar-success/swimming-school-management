import { Card } from '@mui/material';
import { GRID_MODE } from 'src/modules/types';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import darkBreakpoints from 'src/mui/assets/theme-dark/base/breakpoints';
import lightBreakpoints from 'src/mui/assets/theme/base/breakpoints';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import muiActions from 'src/modules/mui/muiActions';
import ProductListFilter from 'src/view/product/list/ProductListFilter';
import ProductListTable from 'src/view/product/list/ProductListTable';
import ProductListToolbar from 'src/view/product/list/ProductListToolbar';

const VIEW_MODE_SECTION_NAME = 'product';

function ProductListPage(props) {
  const dispatch = useDispatch();
  const { darkMode, viewMode } = selectMuiSettings(
    VIEW_MODE_SECTION_NAME,
  );

  const breakpoints = darkMode
    ? darkBreakpoints.values
    : lightBreakpoints.values;

  const [columns, setColumns] = useState(6);

  const onSetViewMode = (mode) => {
    dispatch(
      muiActions.doViewMode({
        section: VIEW_MODE_SECTION_NAME,
        viewMode: mode,
      }),
    );
  };

  const renderPage = () => (
    <>
      <MDBox pt={2.4} px={2.4}>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          pb={2.4}
        >
          <MDTypography variant="h3">
            {i18n('entities.product.list.title')}
          </MDTypography>
          <ProductListToolbar
            viewMode={viewMode}
            onSetViewMode={onSetViewMode}
          />
        </MDBox>
        <ProductListFilter />
      </MDBox>
      <ProductListTable
        viewMode={viewMode}
        columns={columns}
      />
    </>
  );

  useEffect(() => {
    function handleDetectColumns() {
      if (viewMode !== GRID_MODE) {
        return;
      }
      const width = window.innerWidth;
      if (width >= breakpoints.lg) {
        setColumns(4);
      } else if (width >= breakpoints.md) {
        setColumns(3);
      } else if (width >= breakpoints.sm) {
        setColumns(2);
      } else {
        setColumns(1);
      }
    }

    window.addEventListener('resize', handleDetectColumns);

    handleDetectColumns();

    return () =>
      window.removeEventListener(
        'resize',
        handleDetectColumns,
      );
  }, [viewMode]);

  return viewMode === GRID_MODE ? (
    renderPage()
  ) : (
    <Card>{renderPage()}</Card>
  );
}

export default ProductListPage;
