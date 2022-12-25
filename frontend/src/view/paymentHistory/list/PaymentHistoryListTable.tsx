import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import moment from 'moment';
import { DEFAULT_MOMENT_FORMAT_DATE_ONLY } from 'src/config/common';
import {
  Avatar,
  TableContainer,
  Tooltip,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import actions from 'src/modules/payment/destroy/paymentDestroyActions';
import studentActions from 'src/modules/student/list/studentListActions';
import Checkbox from '@mui/material/Checkbox';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import MDBox from 'src/mui/components/MDBox';
import ClassListItem from 'src/view/class/list/ClassListItem';

import MDTypography from 'src/mui/components/MDTypography';
import Pagination from 'src/view/shared/table/Pagination';
import selectors from 'src/modules/student/list/studentListSelectors';
import paymentSelectors from 'src/modules/payment/paymentSelectors';
import Spinner from 'src/view/shared/Spinner';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import paymentEnumerators from 'src/modules/payment/paymentEnumerators';

function PaymentHistoryListTable(props) {
  const { sidenavColor } = selectMuiSettings();

  const dispatch = useDispatch();
  const [recordUserIdToDestroy, setRecordUserIdToDestroy] =
    useState(null);
  const [
    recordPaymentIdToDestroy,
    setRecordPaymentIdToDestroy,
  ] = useState(null);

  const loading = useSelector(selectors.selectLoading);

  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);
  const hasPermissionToDestroy = useSelector(
    paymentSelectors.selectPermissionToDestroy,
  );

  const doChangeSort = (field) => {
    const order =
      sorter.field === field && sorter.order === 'asc'
        ? 'desc'
        : 'asc';

    dispatch(
      studentActions.doChangeSort({
        field,
        order,
      }),
    );
  };

  const doChangePagination = (pagination) => {
    dispatch(studentActions.doChangePagination(pagination));
  };

  const doDestroy = (userId, paymentId) => {
    setRecordUserIdToDestroy(null);
    setRecordPaymentIdToDestroy(null);
    dispatch(actions.doDestroy(userId, paymentId));
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
              <DataTableHeadCell sorted={false}>
                {i18n('payment.fields.month')}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false}>
                {i18n('common.createdAt')}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false}>
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
              rows.map((row) =>
                row.payments?.map((payment) => (
                  <TableRow key={payment.id}>
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
                            to={`/payment-history/${row.id}/${payment.id}`}
                            color={sidenavColor}
                          >
                            <SearchIcon />
                          </IconButton>
                        </Tooltip>
                        {hasPermissionToDestroy && (
                          <Tooltip
                            disableInteractive
                            title={i18n('common.destroy')}
                          >
                            <IconButton
                              size="small"
                              onClick={() => {
                                setRecordUserIdToDestroy(
                                  row.id,
                                );
                                setRecordPaymentIdToDestroy(
                                  payment.id,
                                );
                              }}
                              color={sidenavColor}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </MDBox>
                    </DataTableBodyCell>
                    <DataTableBodyCell>
                      {row.studentNumber}
                    </DataTableBodyCell>
                    <DataTableBodyCell>
                      {row.fullName}
                    </DataTableBodyCell>
                    <DataTableBodyCell>
                      {
                        paymentEnumerators.months[
                          payment.month
                        ]
                      }
                    </DataTableBodyCell>
                    <DataTableBodyCell>
                      {moment(payment.createdAt).format(
                        DEFAULT_MOMENT_FORMAT_DATE_ONLY,
                      )}
                    </DataTableBodyCell>
                    <DataTableBodyCell>
                      {payment.cost}
                    </DataTableBodyCell>
                  </TableRow>
                )),
              )}
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

      {recordUserIdToDestroy && recordPaymentIdToDestroy && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() =>
            doDestroy(
              recordUserIdToDestroy,
              recordPaymentIdToDestroy,
            )
          }
          onClose={() => {
            setRecordUserIdToDestroy(null);
            setRecordPaymentIdToDestroy(null);
          }}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </>
  );
}

export default PaymentHistoryListTable;
