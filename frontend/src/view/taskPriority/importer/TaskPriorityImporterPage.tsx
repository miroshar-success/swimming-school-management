import { Card } from '@mui/material';
import React from 'react';
import { i18n } from 'src/i18n';
import actions from 'src/modules/taskPriority/importer/taskPriorityImporterActions';
import fields from 'src/modules/taskPriority/importer/taskPriorityImporterFields';
import selectors from 'src/modules/taskPriority/importer/taskPriorityImporterSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import importerHoc from 'src/view/shared/importer/Importer';

function TaskPriorityImportPage() {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('entities.taskPriority.importer.hint'),
  );

  return (
    <>
      <Card>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          p={2.4}
        >
          <MDTypography variant="h3">
            {i18n('entities.taskPriority.importer.title')}
          </MDTypography>
        </MDBox>
        <Importer />
      </Card>
    </>
  );
}

export default TaskPriorityImportPage;
