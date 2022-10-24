import { getRowsByColumns } from 'src/modules/utils';
import { GRID_MODE, LIST_MODE } from 'src/modules/types';
import { Grid, TableContainer } from '@mui/material';
import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import actions from 'src/modules/product/list/productListActions';
import authSelectors from 'src/modules/auth/authSelectors';
import Checkbox from '@mui/material/Checkbox';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';
import DeleteIcon from '@mui/icons-material/Delete';
import destroyActions from 'src/modules/product/destroy/productDestroyActions';
import destroySelectors from 'src/modules/product/destroy/productDestroySelectors';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import Message from 'src/view/shared/message';
import Pagination from 'src/view/shared/table/Pagination';
import PriceListItem from 'src/view/shared/table/PriceListItem';
import ProductCard from 'src/view/product/list/ProductCard';
import ProductCategoryListItem from 'src/view/productCategory/list/ProductCategoryListItem';
import productSelectors from 'src/modules/product/productSelectors';
import RatingListItem from 'src/view/shared/table/RatingListItem';
import RiskFormModal from 'src/view/risk/form/RiskFormModal';
import SearchIcon from '@mui/icons-material/Search';
import selectors from 'src/modules/product/list/productListSelectors';
import Spinner from 'src/view/shared/Spinner';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TagListItem from 'src/view/tag/list/TagListItem';
import TaskFormModal from 'src/view/task/form/TaskFormModal';
import Tooltip from '@mui/material/Tooltip';

function ProductListTable(props) {
  const { sidenavColor } = selectMuiSettings();
  const { columns, viewMode } = props;
  const [recordIdToDestroy, setRecordIdToDestroy] =
    useState(null);
  const dispatch = useDispatch();

  const findLoading = useSelector(selectors.selectLoading);

  const destroyLoading = useSelector(
    destroySelectors.selectLoading,
  );

  const loading = findLoading || destroyLoading;

  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const selectedKeys = useSelector(
    selectors.selectSelectedKeys,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);
  const isAllSelected = useSelector(
    selectors.selectIsAllSelected,
  );
  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );
  const hasPermissionToEdit = useSelector(
    productSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    productSelectors.selectPermissionToDestroy,
  );

  const [visibleTaskModal, setVisibleTaskModal] =
    useState(null);

  const handleOpenCreateTask = (newsArticle) => {
    setVisibleTaskModal(newsArticle);
  };

  const handleCloseCreateTask = () => {
    setVisibleTaskModal(null);
  };

  const doSuccessOnNewTaskFormModal = () => {
    Message.success(i18n('entities.task.create.success'));
    handleCloseCreateTask();
  };

  const [visibleRiskModal, setVisibleRiskModal] =
    useState(null);

  const handleOpenCreateRisk = (newsArticle) => {
    setVisibleRiskModal(newsArticle);
  };

  const handleCloseCreateRisk = () => {
    setVisibleRiskModal(null);
  };

  const doSuccessOnNewRiskFormModal = () => {
    Message.success(i18n('entities.risk.create.success'));
    handleCloseCreateRisk();
  };

  const doOpenDestroyConfirmModal = (id) => {
    setRecordIdToDestroy(id);
  };

  const doCloseDestroyConfirmModal = () => {
    setRecordIdToDestroy(null);
  };

  const doChangeSort = (field) => {
    const order =
      sorter.field === field && sorter.order === 'asc'
        ? 'desc'
        : 'asc';

    dispatch(
      actions.doChangeSort({
        field,
        order,
      }),
    );
  };

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  const doDestroy = (id) => {
    doCloseDestroyConfirmModal();

    dispatch(destroyActions.doDestroy(id));
  };

  const doToggleAllSelected = () => {
    dispatch(actions.doToggleAllSelected());
  };

  const doToggleOneSelected = (id) => {
    dispatch(actions.doToggleOneSelected(id));
  };

  const renderTable = () => {
    if (viewMode !== LIST_MODE) {
      return null;
    }
    return (
      <TableContainer sx={{ boxShadow: 'none' }}>
        <Table>
          <MDBox component="thead">
            <TableRow>
              <DataTableHeadCell
                padding="checkbox"
                width="0"
                sorted={false}
              >
                {hasRows && (
                  <Checkbox
                    color={sidenavColor}
                    checked={Boolean(isAllSelected)}
                    onChange={() => doToggleAllSelected()}
                    size="small"
                  />
                )}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false} width="0">
                {' '}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('reference')}
                sorted={
                  sorter.field === 'reference'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('entities.product.fields.reference')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('title')}
                sorted={
                  sorter.field === 'title'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('entities.product.fields.title')}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false}>
                {i18n('entities.product.fields.category')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('website')}
                sorted={
                  sorter.field === 'website'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('entities.product.fields.website')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('rating')}
                sorted={
                  sorter.field === 'rating'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('entities.product.fields.rating')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('price')}
                sorted={
                  sorter.field === 'price'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('entities.product.fields.price')}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false}>
                {i18n('entities.product.fields.tags')}
              </DataTableHeadCell>
            </TableRow>
          </MDBox>
          <TableBody>
            {loading && (
              <TableRow>
                <DataTableBodyCell
                  align="center"
                  colSpan={100}
                >
                  <Spinner />
                </DataTableBodyCell>
              </TableRow>
            )}
            {!loading && !hasRows && (
              <TableRow>
                <DataTableBodyCell
                  align="center"
                  colSpan={100}
                >
                  <MDTypography align="center">
                    {i18n('table.noData')}
                  </MDTypography>
                </DataTableBodyCell>
              </TableRow>
            )}
            {!loading &&
              rows.map((row) => (
                <TableRow key={row.id}>
                  <DataTableBodyCell padding="checkbox">
                    <Checkbox
                      color={sidenavColor}
                      checked={selectedKeys.includes(
                        row.id,
                      )}
                      onChange={() =>
                        doToggleOneSelected(row.id)
                      }
                      size="small"
                    />
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.tenant === currentTenant.id && (
                      <MDBox
                        display="flex"
                        justifyContent="flex-end"
                      >
                        <Tooltip
                          disableInteractive
                          title={i18n('common.view')}
                        >
                          <IconButton
                            size="small"
                            component={Link}
                            color={sidenavColor}
                            to={`/product/${row.id}`}
                          >
                            <SearchIcon />
                          </IconButton>
                        </Tooltip>
                        {hasPermissionToEdit && (
                          <Tooltip
                            disableInteractive
                            title={i18n('common.edit')}
                          >
                            <IconButton
                              size="small"
                              color={sidenavColor}
                              component={Link}
                              to={`/product/${row.id}/edit`}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                        {hasPermissionToDestroy && (
                          <Tooltip
                            disableInteractive
                            title={i18n('common.destroy')}
                          >
                            <IconButton
                              size="small"
                              color={sidenavColor}
                              onClick={() =>
                                doOpenDestroyConfirmModal(
                                  row.id,
                                )
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </MDBox>
                    )}
                  </DataTableBodyCell>
                  <DataTableBodyCell align="right">
                    {row.reference}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.title}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <ProductCategoryListItem
                      value={row.category}
                    />
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.website}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <RatingListItem
                      value={row.rating}
                      precision={0.1}
                      showValue
                    />
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <PriceListItem value={row.price} />
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <TagListItem value={row.tags} />
                  </DataTableBodyCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderCards = () => {
    if (viewMode !== GRID_MODE) {
      return null;
    }
    const gridRows = getRowsByColumns(rows, columns);
    return (
      <MDBox position="relative" py={1.6} minHeight={100}>
        {hasRows && (
          <Grid spacing={1.6} container>
            {gridRows.map((subRows, index) => (
              <Grid key={index} xs={12 / columns} item>
                <Grid spacing={1.6} container>
                  {subRows.map((row) => (
                    <Grid key={row.id} xs={12} item>
                      <ProductCard
                        row={row}
                        doOpenDestroyConfirmModal={
                          doOpenDestroyConfirmModal
                        }
                        handleOpenCreateTask={
                          handleOpenCreateTask
                        }
                        handleOpenCreateRisk={
                          handleOpenCreateRisk
                        }
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            ))}
          </Grid>
        )}
        {!loading && !hasRows && (
          <MDTypography align="center">
            {i18n('table.noData')}
          </MDTypography>
        )}
        {loading && (
          <MDBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            position="absolute"
            width="100%"
            height="100%"
            top="0"
          >
            <Spinner />
          </MDBox>
        )}
      </MDBox>
    );
  };

  return (
    <>
      {renderTable()}
      {renderCards()}

      <Pagination
        onChange={doChangePagination}
        disabled={loading}
        pagination={pagination}
        entriesPerPage={{
          defaultPageSize: 12,
          entries: ['12', '24', '48', '96'],
        }}
        showTotalEntries
      />

      {recordIdToDestroy && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDestroy(recordIdToDestroy)}
          onClose={() => doCloseDestroyConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}

      {Boolean(visibleTaskModal) && (
        <TaskFormModal
          onClose={handleCloseCreateTask}
          onSuccess={doSuccessOnNewTaskFormModal}
          products={visibleTaskModal}
          hiddenImpossibleFields
        />
      )}

      {Boolean(visibleRiskModal) && (
        <RiskFormModal
          onClose={handleCloseCreateRisk}
          onSuccess={doSuccessOnNewRiskFormModal}
          products={visibleRiskModal}
        />
      )}
    </>
  );
}

export default ProductListTable;
