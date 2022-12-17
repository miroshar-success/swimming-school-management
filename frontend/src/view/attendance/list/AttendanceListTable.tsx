import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { TableContainer, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import moment from 'moment';
import { DEFAULT_MOMENT_FORMAT_DATE_ONLY } from 'src/config/common';
import actions from 'src/modules/attendance/list/attendanceListActions';
import Checkbox from '@mui/material/Checkbox';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import attendanceSelectors from 'src/modules/attendance/attendanceSelectors';
import Pagination from 'src/view/shared/table/Pagination';
import SearchIcon from '@mui/icons-material/Search';
import selectors from 'src/modules/attendance/list/attendanceListSelectors';
import Spinner from 'src/view/shared/Spinner';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import ClassListItem from 'src/view/class/list/ClassListItem';
import TeacherListItem from 'src/view/teacher/list/TeacherListItem';
import lessonListActions from 'src/modules/lesson/list/lessonListActions';

function AttendanceListTable(props) {
  const { sidenavColor } = selectMuiSettings();
  const [recordIdToDestroy, setRecordIdToDestroy] =
    useState(null);
  const dispatch = useDispatch();

  const loading = useSelector(selectors.selectLoading);

  const lessons = useSelector(selectors.selectLessons);
  const hasPermissionToEdit = useSelector(
    attendanceSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    attendanceSelectors.selectPermissionToDestroy,
  );
  const hasPermissionToRead = useSelector(
    attendanceSelectors.selectPermissionToRead,
  );

  console.log(lessons);

  return (
    <>
      <MDBox>
        {loading && (
          <MDBox>
            <Spinner />
          </MDBox>
        )}
        {!loading &&
          lessons.map((lesson) => (
            <MDBox
              display="flex"
              justifyContent="space-between"
              key={lesson.id}
            >
              <MDBox>{lesson.class.name}</MDBox>
              <MDBox>
                {moment(lesson.time).format('LT') +
                  ' ~ ' +
                  moment(lesson.time)
                    .add(lesson.class.duration, 'minutes')
                    .format('LT')}
              </MDBox>
              <MDBox>{lesson.teacher}</MDBox>
            </MDBox>
          ))}
      </MDBox>
    </>
  );
}

export default AttendanceListTable;
