import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { TableContainer, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'src/modules/payment/list/expiredListActions';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import MDBox from 'src/mui/components/MDBox';

import MDTypography from 'src/mui/components/MDTypography';
import Pagination from 'src/view/shared/table/Pagination';
import selectors from 'src/modules/payment/list/expiredListSelectors';
import Spinner from 'src/view/shared/Spinner';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';

function PaymentExpiredListTable(props) {
  const { sidenavColor } = selectMuiSettings();

  const dispatch = useDispatch();

  const loading = useSelector(selectors.selectLoading);

  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);

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
                onClick={() =>
                  doChangeSort('studentNumber')
                }
                sorted={
                  sorter.field === 'studentNumber'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('user.fields.studentNumber')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('fullName')}
                sorted={
                  sorter.field === 'fullName'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('user.fields.fullName')}
              </DataTableHeadCell>
              <DataTableHeadCell>
                {i18n('payment.fields.month')}
              </DataTableHeadCell>
              <DataTableHeadCell>
                {i18n('payment.fields.expiredDate')}
              </DataTableHeadCell>
              <DataTableHeadCell>
                {i18n('payment.fields.cost')}
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
                          to={`/admin/payment-expired/${row.id}`}
                          color={sidenavColor}
                        >
                          <SearchIcon />
                        </IconButton>
                      </Tooltip>
                    </MDBox>
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.studentNumber}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.fullName}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.month + 1 + '/admin' + row.year}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.expiredDate + ' days'}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.cost}
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

export default PaymentExpiredListTable;
