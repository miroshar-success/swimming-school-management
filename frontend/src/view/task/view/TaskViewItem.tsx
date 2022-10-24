import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import taskSelectors from 'src/modules/task/taskSelectors';
import destroySelectors from 'src/modules/task/destroy/taskDestroySelectors';
import actions from 'src/modules/task/list/taskListActions';
import selectors from 'src/modules/task/list/taskListSelectors';
import Pagination from 'src/view/shared/table/Pagination';
import Spinner from 'src/view/shared/Spinner';
import {
  Table,
  TableRow,
  TableBody,
  IconButton,
  TableContainer,
  Tooltip,
} from '@mui/material';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';
import EditIcon from '@mui/icons-material/Edit';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import SearchIcon from '@mui/icons-material/Search';
import TaskListFilter from 'src/view/task/list/TaskListFilter';
import TaskListTableBodyCells from 'src/view/task/list/TaskListTableBodyCells';
import TaskListTableHeaderCells from 'src/view/task/list/TaskListTableHeaderCells';

function TaskViewItem(props) {
  const { sidenavColor } = selectMuiSettings();
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
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);
  const hasPermissionToEdit = useSelector(
    taskSelectors.selectPermissionToEdit,
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

  return (
    <>
      <MDBox display="flex" gap={4}>
        <MDTypography variant="h5">
          {i18n('entities.task.label')}
        </MDTypography>
        <MDBox flexGrow={1}>
          <TaskListFilter
            additionalFilters={{
              ids: props.value?.map((v) => v.id ?? v),
              contains: true,
            }}
          />
        </MDBox>
      </MDBox>
      <TableContainer sx={{ boxShadow: 'none' }}>
        <Table>
          <MDBox component="thead">
            <TableRow>
              <DataTableHeadCell sorted={false} width="0">
                {' '}
              </DataTableHeadCell>
              <TaskListTableHeaderCells
                sorter={sorter}
                doChangeSort={doChangeSort}
              />
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
                          color={sidenavColor}
                          to={`/task/${row.id}`}
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
                            to={`/task/${row.id}/edit`}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </MDBox>
                  </DataTableBodyCell>
                  <TaskListTableBodyCells row={row} />
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

export default TaskViewItem;
