import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import {
  Grid,
  Card,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
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

function AttendanceListPage(props) {
  const { sidenavColor } = selectMuiSettings();
  const [filterValue, setFilterValue] =
    useState('progress');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.doFetch());
    // eslint-disable-next-line
  }, [dispatch]);

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

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilterValue: string,
  ) => {
    setFilterValue(newFilterValue);
    dispatch(actions.doFetch(newFilterValue));
  };

  console.log(lessons);

  return (
    <Grid container spacing={1.6}>
      <Grid item md={9} sm={12}>
        <Card>
          <ToggleButtonGroup
            color={sidenavColor}
            value={filterValue}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value="progress">
              In progress
            </ToggleButton>
            <ToggleButton value="finished">
              Finished
            </ToggleButton>
            <ToggleButton value="upcoming">
              Upcoming
            </ToggleButton>
            <ToggleButton value="all">See all</ToggleButton>
          </ToggleButtonGroup>
        </Card>
      </Grid>
      <Grid item md={3} sm={12}>
        <Card>
          <MDTypography>
            {moment().format('LT')}
          </MDTypography>
        </Card>
      </Grid>
      <Grid item md={12} sm={12}>
        <Card>
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
                        .add(
                          lesson.class.duration,
                          'minutes',
                        )
                        .format('LT')}
                  </MDBox>
                  <MDBox>{lesson.teacher}</MDBox>
                </MDBox>
              ))}
          </MDBox>
        </Card>
      </Grid>
    </Grid>
  );
}

export default AttendanceListPage;
