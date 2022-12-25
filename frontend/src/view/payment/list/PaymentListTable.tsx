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
import actions from 'src/modules/student/list/studentListActions';
import Checkbox from '@mui/material/Checkbox';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';
import EditIcon from '@mui/icons-material/Edit';
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

function PaymentListTable(props) {
  const { sidenavColor } = selectMuiSettings();

  const dispatch = useDispatch();

  const loading = useSelector(selectors.selectLoading);

  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);
  const hasPermissionToEdit = useSelector(
    paymentSelectors.selectPermissionToEdit,
  );

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

  console.log(rows);

  return (
    <>
      <TableContainer sx={{ boxShadow: 'none' }}>
        <Table>
          <MDBox component="thead">
            <TableRow>
              <DataTableHeadCell sorted={false} width="0">
                {' '}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false}>
                {i18n('student.fields.avatars')}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false}>
                {i18n('student.fields.studentNumber')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('fullName')}
                sorted={
                  sorter.field === 'fullName'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('student.fields.fullName')}
              </DataTableHeadCell>
              <DataTableHeadCell>
                {i18n('student.fields.class')}
              </DataTableHeadCell>
              <DataTableHeadCell>
                {i18n('common.createdAt')}
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
                      {hasPermissionToEdit && (
                        <Tooltip
                          disableInteractive
                          title={i18n('common.edit')}
                        >
                          <IconButton
                            size="small"
                            color={sidenavColor}
                            component={Link}
                            to={`/payment/${row.id}/create`}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </MDBox>
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <Avatar
                      src={
                        row.avatars && row.avatars.length
                          ? row.avatars[0].downloadUrl
                          : undefined
                      }
                      alt={row.email}
                      sx={{
                        width: 32,
                        height: 32,
                      }}
                    />
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.studentNumber}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.fullName}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <ClassListItem
                      value={row.lessons[0]?.class}
                    />
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {moment(row.createdAt).format(
                      DEFAULT_MOMENT_FORMAT_DATE_ONLY,
                    )}
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

export default PaymentListTable;
