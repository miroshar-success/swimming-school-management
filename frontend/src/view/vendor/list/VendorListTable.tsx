import { Box, TableContainer } from '@mui/material';
import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'src/modules/vendor/list/vendorListActions';
import Checkbox from '@mui/material/Checkbox';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';
import DeleteIcon from '@mui/icons-material/Delete';
import destroyActions from 'src/modules/vendor/destroy/vendorDestroyActions';
import destroySelectors from 'src/modules/vendor/destroy/vendorDestroySelectors';
import EditIcon from '@mui/icons-material/Edit';
import FilesListView from 'src/view/shared/table/FileListView';
import IconButton from '@mui/material/IconButton';
import MDBadgeDot from 'src/mui/components/MDBadgeDot';
import MDBox from 'src/mui/components/MDBox';

import MDTypography from 'src/mui/components/MDTypography';
import Pagination from 'src/view/shared/table/Pagination';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import selectors from 'src/modules/vendor/list/vendorListSelectors';
import Spinner from 'src/view/shared/Spinner';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import VendorCategoryListItem from 'src/view/vendorCategory/list/VendorCategoryListItem';
import VendorRatingViewItem from 'src/view/vendor/view/VendorRatingViewItem';
import vendorSelectors from 'src/modules/vendor/vendorSelectors';
import VendorStatusViewItem from 'src/view/vendor/view/VendorStatusViewItem';
import TagListItem from 'src/view/tag/list/TagListItem';

function VendorListTable(props) {
  const { sidenavColor } = selectMuiSettings();
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
  const hasPermissionToEdit = useSelector(
    vendorSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    vendorSelectors.selectPermissionToDestroy,
  );

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

  return (
    <>
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
                {i18n('entities.vendor.fields.reference')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('name')}
                sorted={
                  sorter.field === 'name'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('entities.vendor.fields.name')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('status')}
                sorted={
                  sorter.field === 'status'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('entities.vendor.fields.status')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('rating')}
                sorted={
                  sorter.field === 'rating'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('entities.vendor.fields.rating')}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false}>
                {i18n('entities.vendor.fields.category')}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false}>
                {i18n(
                  'entities.vendor.fields.dataProcessed',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false}>
                {i18n('entities.vendor.fields.tags')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('industry')}
                sorted={
                  sorter.field === 'industry'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('entities.vendor.fields.industry')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() =>
                  doChangeSort('countryOfIncorporation')
                }
                sorted={
                  sorter.field === 'countryOfIncorporation'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n(
                  'entities.vendor.fields.countryOfIncorporation',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() =>
                  doChangeSort('primaryContactName')
                }
                sorted={
                  sorter.field === 'primaryContactName'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n(
                  'entities.vendor.fields.primaryContactName',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() =>
                  doChangeSort('primaryContactEmail')
                }
                sorted={
                  sorter.field === 'primaryContactEmail'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n(
                  'entities.vendor.fields.primaryContactEmail',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() =>
                  doChangeSort('internalBusinessSponsor')
                }
                sorted={
                  sorter.field === 'internalBusinessSponsor'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n(
                  'entities.vendor.fields.internalBusinessSponsor',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('website')}
                sorted={
                  sorter.field === 'website'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('entities.vendor.fields.website')}
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
                    <Box
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
                          to={`/vendor/${row.id}`}
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
                            to={`/vendor/${row.id}/edit`}
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
                    </Box>
                  </DataTableBodyCell>
                  <DataTableBodyCell align="right">
                    {row.reference}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.name}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <VendorStatusViewItem
                      value={row.status}
                    />
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <VendorRatingViewItem
                      value={row.rating}
                    />
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <VendorCategoryListItem
                      value={row.category}
                    />
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {(row.dataProcessed || []).map(
                      (value) => (
                        <MDBadgeDot
                          key={value}
                          width="max-content"
                          badgeContent={
                            value
                              ? i18n(
                                  `entities.vendor.enumerators.dataProcessed.${value}`,
                                )
                              : null
                          }
                          color={sidenavColor}
                          variant="contained"
                        />
                      ),
                    )}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <TagListItem value={row.tags} />
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.industry
                      ? i18n(
                          `entities.vendor.enumerators.industry.${row.industry}`,
                        )
                      : null}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.countryOfIncorporation
                      ? i18n(
                          `entities.vendor.enumerators.countryOfIncorporation.${row.countryOfIncorporation}`,
                        )
                      : null}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.primaryContactName}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.primaryContactEmail}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.internalBusinessSponsor}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.website}
                  </DataTableBodyCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        onChange={doChangePagination}
        disabled={loading}
        pagination={pagination}
        entriesPerPage
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
    </>
  );
}

export default VendorListTable;
