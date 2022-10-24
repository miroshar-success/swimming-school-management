import { ReactNode } from 'react';

import Icon from '@mui/material/Icon';

import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

import { useTimeline } from 'src/mui/shared/Timeline/context';

import timelineItem from 'src/mui/shared/Timeline/TimelineItem/styles';
import taskListEnumerators from 'src/modules/taskList/taskListEnumerators';

// Declaring prop types for TimelineItem
interface Props {
  color?: string;
  icon?: ReactNode;
  title: string;
  dateTime: string;
  owner?: string;
  lastItem?: boolean;
  [key: string]: any;
}

function UpcomingTaskItem({
  color,
  icon,
  title,
  dateTime,
  owner,
  lastItem,
}: Props): JSX.Element {
  const isDark = useTimeline();

  const colorFn = (taskdisplaycolor) =>
    taskListEnumerators.taskdisplaycolorColor[
      taskListEnumerators.taskdisplaycolor.indexOf(
        taskdisplaycolor,
      )
    ];

  const realColor = colorFn(color);

  return (
    <MDBox
      position="relative"
      mb={lastItem ? 0 : 2.4}
      sx={(theme: any) =>
        timelineItem(theme, { lastItem, isDark })
      }
    >
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgColor={realColor}
        color="white"
        width="1.6rem"
        height="1.6rem"
        borderRadius="50%"
        position="absolute"
        top="0.25rem"
        left="1.6px"
        zIndex={2}
        sx={{
          fontSize: ({ typography: { size } }: any) =>
            size.sm,
        }}
      >
        <Icon fontSize="inherit">{icon}</Icon>
      </MDBox>
      <MDBox ml={4.6} lineHeight={0} maxWidth="24rem">
        <MDTypography
          variant="button"
          fontWeight="medium"
          color={isDark ? 'white' : 'dark'}
          sx={{
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: 'inline-block',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </MDTypography>
        <MDBox
          mt={0.4}
          display="flex"
          justifyContent="flex-start"
        >
          {owner && (
            <MDTypography
              variant="caption"
              fontWeight="bold"
              color="text"
              textTransform="capitalize"
              mr={0.8}
            >
              {owner}
            </MDTypography>
          )}
          <MDTypography
            variant="caption"
            color={isDark ? 'secondary' : 'text'}
            fontWeight="regular"
          >
            {dateTime}
          </MDTypography>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

// Declaring default props for UpcomingTaskItem
UpcomingTaskItem.defaultProps = {
  icon: <Icon>task</Icon>,
  lastItem: false,
};

export default UpcomingTaskItem;
