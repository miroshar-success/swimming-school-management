import {
  Autocomplete,
  Box,
  Icon,
  TableContainer,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import { i18n } from 'src/i18n';
import actions from 'src/modules/auditLog/auditLogActions';
import selectors from 'src/modules/auditLog/auditLogSelectors';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'src/view/shared/Spinner';
import Pagination from 'src/view/shared/table/Pagination';
import TableCellCustom from 'src/view/shared/table/TableCellCustom';
import moment from 'moment';
import MDBox from 'src/mui/components/MDBox';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import { DEFAULT_MOMENT_FORMAT } from 'src/config/common';

function AuditLogTable(props) {
  const dispatch = useDispatch();
  const { sidenavColor } = selectMuiSettings();

  const doOpenSelectdValues = (values) => {
    const data = JSON.stringify(values, null, 2);
    const jsonWindow = (window as any).open(
      '',
      '_blank',
      'toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400',
    );
    jsonWindow.document.write(`<pre>${data}</pre>`);
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

  const loading = useSelector(selectors.selectLoading);
  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);

  return (
    <>
      <TableContainer sx={{ boxShadow: 'none' }}>
        <Table>
          <MDBox component="thead">
            <TableRow>
              <DataTableHeadCell sorted={false} width="0">
                {' '}
              </DataTableHeadCell>

              <DataTableHeadCell
                onClick={() => doChangeSort('timestamp')}
                sorted={
                  sorter.field === 'timestamp'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('auditLog.fields.timestamp')}
              </DataTableHeadCell>

              <DataTableHeadCell
                onClick={() =>
                  doChangeSort('createdByEmail')
                }
                sorted={
                  sorter.field === 'createdByEmail'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('auditLog.fields.createdByEmail')}
              </DataTableHeadCell>

              <DataTableHeadCell
                onClick={() => doChangeSort('entityName')}
                sorted={
                  sorter.field === 'entityName'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('auditLog.fields.entityName')}
              </DataTableHeadCell>

              <DataTableHeadCell
                onClick={() => doChangeSort('action')}
                sorted={
                  sorter.field === 'action'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('auditLog.fields.action')}
              </DataTableHeadCell>

              <DataTableHeadCell
                onClick={() => doChangeSort('entityId')}
                sorted={
                  sorter.field === 'entityId'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('auditLog.fields.entityId')}
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
                  <MDTypography>
                    {i18n('table.noData')}
                  </MDTypography>
                </DataTableBodyCell>
              </TableRow>
            )}
            {!loading &&
              rows.map((row) => (
                <TableRow key={row.id}>
                  <DataTableBodyCell>
                    <Tooltip
                      disableInteractive
                      title={i18n('common.view')}
                    >
                      <IconButton
                        onClick={() =>
                          doOpenSelectdValues(row.values)
                        }
                        color={sidenavColor}
                        size="small"
                      >
                        <SearchIcon />
                      </IconButton>
                    </Tooltip>
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {moment(row.timestamp).format(
                      DEFAULT_MOMENT_FORMAT,
                    )}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.createdByEmail}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.entityName}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.action}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.entityId}
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
    </>
  );
}

export default AuditLogTable;
