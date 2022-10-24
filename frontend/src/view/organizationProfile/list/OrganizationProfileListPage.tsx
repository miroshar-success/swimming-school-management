import React from 'react';
import { i18n } from 'src/i18n';
import OrganizationProfileListFilter from 'src/view/organizationProfile/list/OrganizationProfileListFilter';
import OrganizationProfileListTable from 'src/view/organizationProfile/list/OrganizationProfileListTable';
import OrganizationProfileListToolbar from 'src/view/organizationProfile/list/OrganizationProfileListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function OrganizationProfileListPage(props) {
  return (
    <>
      <Card>
        <MDBox pt={2.4} px={2.4}>
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            pb={2.4}
          >
            <MDTypography variant="h3">
              {i18n(
                'entities.organizationProfile.list.title',
              )}
            </MDTypography>

            <OrganizationProfileListToolbar />
          </MDBox>
          <OrganizationProfileListFilter />
        </MDBox>
        <OrganizationProfileListTable />
      </Card>
    </>
  );
}

export default OrganizationProfileListPage;
