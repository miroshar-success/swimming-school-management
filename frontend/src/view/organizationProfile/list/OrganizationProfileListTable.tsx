import { Box, TableContainer } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import organizationProfileSelectors from 'src/modules/organizationProfile/organizationProfileSelectors';
import destroyActions from 'src/modules/organizationProfile/destroy/organizationProfileDestroyActions';
import destroySelectors from 'src/modules/organizationProfile/destroy/organizationProfileDestroySelectors';
import actions from 'src/modules/organizationProfile/list/organizationProfileListActions';
import selectors from 'src/modules/organizationProfile/list/organizationProfileListSelectors';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Pagination from 'src/view/shared/table/Pagination';
import Spinner from 'src/view/shared/Spinner';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import MDBadgeDot from 'src/mui/components/MDBadgeDot';

function OrganizationProfileListTable(props) {
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
    organizationProfileSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    organizationProfileSelectors.selectPermissionToDestroy,
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
                onClick={() => doChangeSort('companyName')}
                sorted={
                  sorter.field === 'companyName'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n(
                  'entities.organizationProfile.fields.companyName',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('industry')}
                sorted={
                  sorter.field === 'industry'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n(
                  'entities.organizationProfile.fields.industry',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('employee')}
                sorted={
                  sorter.field === 'employee'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n(
                  'entities.organizationProfile.fields.employee',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('thirdParties')}
                sorted={
                  sorter.field === 'thirdParties'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n(
                  'entities.organizationProfile.fields.thirdParties',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('location')}
                sorted={
                  sorter.field === 'location'
                    ? sorter.order
                    : 'none'
                }
                align="right"
              >
                {i18n(
                  'entities.organizationProfile.fields.location',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false}>
                {i18n(
                  'entities.organizationProfile.fields.regulatoryCompliance',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() =>
                  doChangeSort('technologyStack')
                }
                sorted={
                  sorter.field === 'technologyStack'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n(
                  'entities.organizationProfile.fields.technologyStack',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('outsourcedIT')}
                sorted={
                  sorter.field === 'outsourcedIT'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n(
                  'entities.organizationProfile.fields.outsourcedIT',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() =>
                  doChangeSort(
                    'outsourcedSecurityOperations',
                  )
                }
                sorted={
                  sorter.field ===
                  'outsourcedSecurityOperations'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n(
                  'entities.organizationProfile.fields.outsourcedSecurityOperations',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() =>
                  doChangeSort('pastIncidents')
                }
                sorted={
                  sorter.field === 'pastIncidents'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n(
                  'entities.organizationProfile.fields.pastIncidents',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() =>
                  doChangeSort('cspSecurityPolicies')
                }
                sorted={
                  sorter.field === 'cspSecurityPolicies'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n(
                  'entities.organizationProfile.fields.cspSecurityPolicies',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() =>
                  doChangeSort('cspListITAssets')
                }
                sorted={
                  sorter.field === 'cspListITAssets'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n(
                  'entities.organizationProfile.fields.cspListITAssets',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() =>
                  doChangeSort('cspJobRoleInfoSecTraining')
                }
                sorted={
                  sorter.field ===
                  'cspJobRoleInfoSecTraining'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n(
                  'entities.organizationProfile.fields.cspJobRoleInfoSecTraining',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() =>
                  doChangeSort('cspIncidentMgmtPlan')
                }
                sorted={
                  sorter.field === 'cspIncidentMgmtPlan'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n(
                  'entities.organizationProfile.fields.cspIncidentMgmtPlan',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() =>
                  doChangeSort(
                    'cspIncidentVendorNotification',
                  )
                }
                sorted={
                  sorter.field ===
                  'cspIncidentVendorNotification'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n(
                  'entities.organizationProfile.fields.cspIncidentVendorNotification',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() =>
                  doChangeSort('cspCyberInsurance')
                }
                sorted={
                  sorter.field === 'cspCyberInsurance'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n(
                  'entities.organizationProfile.fields.cspCyberInsurance',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() =>
                  doChangeSort(
                    'cspLatestCyberAwarenessThreats',
                  )
                }
                sorted={
                  sorter.field ===
                  'cspLatestCyberAwarenessThreats'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n(
                  'entities.organizationProfile.fields.cspLatestCyberAwarenessThreats',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() =>
                  doChangeSort('cspMFAUtilized')
                }
                sorted={
                  sorter.field === 'cspMFAUtilized'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n(
                  'entities.organizationProfile.fields.cspMFAUtilized',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() =>
                  doChangeSort('cspSecurityTesting')
                }
                sorted={
                  sorter.field === 'cspSecurityTesting'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n(
                  'entities.organizationProfile.fields.cspSecurityTesting',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() =>
                  doChangeSort('cspBackupStrategy')
                }
                sorted={
                  sorter.field === 'cspBackupStrategy'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n(
                  'entities.organizationProfile.fields.cspBackupStrategy',
                )}
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
                          to={`/organization-profile/${row.id}`}
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
                            to={`/organization-profile/${row.id}/edit`}
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
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.companyName}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.industry
                      ? i18n(
                          `entities.organizationProfile.enumerators.industry.${row.industry}`,
                        )
                      : null}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.employee
                      ? i18n(
                          `entities.organizationProfile.enumerators.employee.${row.employee}`,
                        )
                      : null}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.thirdParties
                      ? i18n(
                          `entities.organizationProfile.enumerators.thirdParties.${row.thirdParties}`,
                        )
                      : null}
                  </DataTableBodyCell>
                  <DataTableBodyCell align="right">
                    {row.location}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {(row.regulatoryCompliance || []).map(
                      (value) => (
                        <MDBadgeDot
                          key={value}
                          width="max-content"
                          badgeContent={
                            value
                              ? i18n(
                                  `entities.organizationProfile.enumerators.regulatoryCompliance.${value}`,
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
                    {row.technologyStack
                      ? i18n(
                          `entities.organizationProfile.enumerators.technologyStack.${row.technologyStack}`,
                        )
                      : null}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.outsourcedIT
                      ? i18n('common.yes')
                      : i18n('common.no')}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.outsourcedSecurityOperations
                      ? i18n('common.yes')
                      : i18n('common.no')}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.pastIncidents}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.cspSecurityPolicies
                      ? i18n('common.yes')
                      : i18n('common.no')}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.cspListITAssets
                      ? i18n('common.yes')
                      : i18n('common.no')}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.cspJobRoleInfoSecTraining
                      ? i18n('common.yes')
                      : i18n('common.no')}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.cspIncidentMgmtPlan
                      ? i18n('common.yes')
                      : i18n('common.no')}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.cspIncidentVendorNotification
                      ? i18n('common.yes')
                      : i18n('common.no')}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.cspCyberInsurance
                      ? i18n('common.yes')
                      : i18n('common.no')}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.cspLatestCyberAwarenessThreats
                      ? i18n('common.yes')
                      : i18n('common.no')}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.cspMFAUtilized
                      ? i18n('common.yes')
                      : i18n('common.no')}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.cspSecurityTesting
                      ? i18n('common.yes')
                      : i18n('common.no')}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.cspBackupStrategy
                      ? i18n('common.yes')
                      : i18n('common.no')}
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

export default OrganizationProfileListTable;
