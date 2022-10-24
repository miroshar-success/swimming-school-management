import React from 'react';
import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import SummaryItem from 'src/view/widgets/RisksSummary/SummaryItem';

function RisksSummary() {
  return (
    <Card sx={{ height: '100%' }}>
      <MDBox>
        <MDBox pt={2.4} px={1.6}>
          <MDTypography variant="h6" fontWeight="medium">
            {i18n('widgets.risksSummary.title')}
          </MDTypography>
        </MDBox>
        <MDBox p={1.6}>
          <Grid container spacing={1.6}>
            <SummaryItem
              title="Total Open Risks"
              icon="flag"
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
              title="Risks with no owner"
              icon="no_accounts"
              color="warning"
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
              title="Risks Coming Due"
              icon="date_range"
              color="info"
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
              title="Inherent Score"
              icon="mood_bad"
              color="primary"
              descriptions={[
                {
                  count: 5,
                  suffix: 'High',
                },
                {
                  count: 1,
                  suffix: 'High Medium',
                },
              ]}
            />
          </Grid>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default RisksSummary;
