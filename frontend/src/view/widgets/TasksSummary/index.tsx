import React from 'react';
import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import SummaryItem from 'src/view/widgets/TasksSummary/SummaryItem';

function TasksSummary() {
  return (
    <Card sx={{ height: '100%' }}>
      <MDBox>
        <MDBox pt={2.4} px={1.6}>
          <MDTypography variant="h6" fontWeight="medium">
            {i18n('widgets.tasksSummary.title')}
          </MDTypography>
        </MDBox>
        <MDBox p={1.6}>
          <Grid container spacing={1.6}>
            <SummaryItem
              title="Completion"
              icon="event_available"
              color="success"
              descriptions={[
                {
                  count: 250,
                  suffix: 'closed',
                },
                {
                  count: 30,
                  suffix: 'open',
                },
                {
                  count: 15,
                  suffix: 'in progress',
                },
              ]}
            />
            <SummaryItem
              title="Coming Due"
              icon="date_range"
              color="info"
              descriptions={[
                {
                  count: 3,
                  suffix: 'not started',
                },
                {
                  count: 2,
                  suffix: 'in progress',
                },
              ]}
            />
            <SummaryItem
              title="Overdue"
              icon="event_available"
              color="warning"
              descriptions={[
                {
                  count: 5,
                  suffix: 'not started',
                },
                {
                  count: 1,
                  suffix: 'in progress',
                },
              ]}
            />
            <SummaryItem
              title="Require Review"
              icon="sentiment_satisfied_alt"
              color="primary"
              descriptions={[
                {
                  count: 10,
                  suffix: 'for review',
                },
                {
                  count: 5,
                  suffix: 'require my review',
                },
              ]}
            />
            <SummaryItem
              title="Unassigned"
              icon="assignment_late"
              color="error"
              descriptions={[
                {
                  count: 20,
                  suffix: 'for review',
                },
              ]}
            />
            <SummaryItem
              title="No Due Date"
              icon="event_busy"
              color="dark"
              descriptions={[
                {
                  count: 5,
                  suffix: 'for review',
                },
              ]}
            />
          </Grid>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default TasksSummary;
