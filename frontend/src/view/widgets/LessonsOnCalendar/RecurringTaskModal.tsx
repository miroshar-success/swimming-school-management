import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Icon,
  IconButton,
} from '@mui/material';
import { DEFAULT_MOMENT_FORMAT } from 'src/config/common';
import {
  getAbsoluteDateTimeByHour,
  getUserNameOrEmailPrefix,
} from 'src/modules/utils';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import actions from 'src/modules/widget/tasksOnCalendar/tasksOnCalendarActions';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import ReactDOM from 'react-dom';
import selectors from 'src/modules/widget/tasksOnCalendar/tasksOnCalendarSelectors';
import Spinner from 'src/view/shared/Spinner';
import taskListEnumerators from 'src/modules/taskList/taskListEnumerators';
import timelineItem from 'src/mui/shared/Timeline/TimelineItem/styles';

function RecurringTaskModal(props) {
  const dispatch = useDispatch();

  const [dispatched, setDispatched] = useState(false);
  const { darkMode, sidenavColor } = selectMuiSettings();

  const isLoading = useSelector(selectors.selectLoading);
  const tasks = useSelector(selectors.selectTasks);
  const totalPages = useSelector(
    selectors.selectTotalPages,
  );
  const [page, setPage] = useState(1);
  const selectedDate = moment(props.date);

  const doMore = () => {
    dispatch(actions.doMore(props.date, page + 1));
    setPage(page + 1);
  };

  const doClose = () => {
    return props.onClose();
  };

  const doRecurringTask = (id) => {
    props.onOpenTaskFormModal(id, props.date);
  };

  useEffect(() => {
    dispatch(actions.doReset());
    dispatch(actions.doMore(props.date, page));
    setDispatched(true);
  }, [dispatch, props.date]);

  useEffect(() => {
    if (dispatched && !isLoading && tasks.length === 0) {
      doClose();
      doRecurringTask(null);
    }
  }, [dispatch, tasks]);

  const colorFn = (taskdisplaycolor) =>
    taskListEnumerators.taskdisplaycolorColor[
      taskListEnumerators.taskdisplaycolor.indexOf(
        taskdisplaycolor,
      )
    ];

  return ReactDOM.createPortal(
    <Dialog
      open={true}
      onClose={doClose}
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle>
        <MDBox
          display="flex"
          justifyContent="space-between"
        >
          <MDTypography>
            {i18n(
              'widgets.tasksOnCalendar.modals.recurring.title',
              moment(props.date).format('dddd, LL'),
            )}
          </MDTypography>
          <IconButton
            color="secondary"
            onClick={doClose}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </MDBox>
      </DialogTitle>
      <DialogContent sx={{ pb: 0 }}>
        {!isLoading && tasks.length === 0 && (
          <Grid item xs={12}>
            <MDTypography
              variant="button"
              fontWeight="regular"
            >
              {i18n('table.noData')}
            </MDTypography>
          </Grid>
        )}
        {tasks.map((task, i, a) => (
          <MDBox
            key={task._id}
            onClick={() => doRecurringTask(task._id)}
            position="relative"
            p={0.8}
            mb={i + 1 === a.length ? 0 : 0.8}
            borderRadius="md"
            sx={(theme: any) =>
              timelineItem(theme, {
                lastItem: i + 1 === a.length,
                isDark: darkMode,
                isHover: true,
                ml: 1,
              })
            }
          >
            <MDBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgColor={colorFn(
                task.taskList[0].taskdisplaycolor,
              )}
              color="white"
              width="1.6rem"
              height="1.6rem"
              borderRadius="50%"
              position="absolute"
              mt={0.8}
              ml={0.8}
              top="0.25rem"
              left="1.6px"
              zIndex={2}
              sx={{
                fontSize: ({ typography: { size } }: any) =>
                  size.sm,
              }}
            >
              <Icon fontSize="inherit">task</Icon>
            </MDBox>
            <MDBox ml={4.6} lineHeight={0} maxWidth="24rem">
              <MDTypography
                variant="button"
                fontWeight="medium"
                color={darkMode ? 'white' : 'dark'}
                sx={{
                  maxWidth: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                }}
              >
                {task.title}
              </MDTypography>
              <MDBox
                mt={0.4}
                display="flex"
                justifyContent="flex-start"
              >
                {task.owner && (
                  <MDTypography
                    variant="caption"
                    fontWeight="bold"
                    color="text"
                    textTransform="capitalize"
                    mr={0.8}
                  >
                    {getUserNameOrEmailPrefix(task.owner)}
                  </MDTypography>
                )}
                <MDTypography
                  variant="caption"
                  color={darkMode ? 'secondary' : 'text'}
                  fontWeight="regular"
                  mr={0.8}
                >
                  {getAbsoluteDateTimeByHour(
                    moment(task.dueDate)
                      .year(selectedDate.year())
                      .month(selectedDate.month())
                      .date(selectedDate.date()),
                  ).format(DEFAULT_MOMENT_FORMAT)}
                </MDTypography>
                <MDTypography
                  variant="caption"
                  color={darkMode ? 'secondary' : 'text'}
                  fontWeight="regular"
                >
                  {task.repeat}
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDBox>
        ))}
        {isLoading && <Spinner size={16} />}
      </DialogContent>
      <DialogActions>
        {page !== totalPages && (
          <MDButton
            variant="outlined"
            color={sidenavColor}
            disabled={isLoading}
            onClick={doMore}
          >
            {i18n('common.more')}
          </MDButton>
        )}
        <MDButton
          variant="gradient"
          color={sidenavColor}
          onClick={() => doRecurringTask(null)}
          startIcon={<AddIcon />}
        >
          {i18n('entities.task.new.title')}
        </MDButton>
      </DialogActions>
    </Dialog>,
    (document as any).getElementById('modal-root'),
  );
}

export default RecurringTaskModal;
