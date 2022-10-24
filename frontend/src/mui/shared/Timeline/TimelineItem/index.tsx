/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { ReactNode } from 'react';

// @mui material components
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

// Timeline context
import { useTimeline } from 'src/mui/shared/Timeline/context';

// Custom styles for the TimelineItem
import timelineItem from 'src/mui/shared/Timeline/TimelineItem/styles';

// Declaring prop types for TimelineItem
interface Props {
  color?:
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'dark'
    | 'light';
  icon: ReactNode;
  title: string;
  dateTime: string;
  description?: string;
  lastItem?: boolean;
  [key: string]: any;
}

function TimelineItem({
  color,
  icon,
  title,
  dateTime,
  description,
  lastItem,
}: Props): JSX.Element {
  const isDark = useTimeline();

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
        bgColor={color}
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
      <MDBox
        ml={4.6}
        pt={description ? 0.7 : 0.5}
        lineHeight={0}
        maxWidth="24rem"
      >
        <MDTypography
          variant="button"
          fontWeight="medium"
          color={isDark ? 'white' : 'dark'}
        >
          {title}
        </MDTypography>
        <MDBox mt={0.4}>
          <MDTypography
            variant="caption"
            color={isDark ? 'secondary' : 'text'}
          >
            {dateTime}
          </MDTypography>
        </MDBox>
        <MDBox mt={1.6} mb={1.2}>
          {description ? (
            <MDTypography
              variant="button"
              color={isDark ? 'white' : 'dark'}
            >
              {description}
            </MDTypography>
          ) : null}
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

// Declaring default props for TimelineItem
TimelineItem.defaultProps = {
  color: 'info',
  lastItem: false,
  description: '',
};

export default TimelineItem;
