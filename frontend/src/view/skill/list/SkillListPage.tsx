import React from 'react';
import { i18n } from 'src/i18n';
import SkillListFilter from 'src/view/skill/list/SkillListFilter';
import SkillListTable from 'src/view/skill/list/SkillListTable';
import SkillListToolbar from 'src/view/skill/list/SkillListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function SkillListPage(props) {
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
              {i18n('skill.title')}
            </MDTypography>
            <SkillListToolbar />
          </MDBox>
          <SkillListFilter />
        </MDBox>
        <SkillListTable />
      </Card>
    </>
  );
}

export default SkillListPage;
