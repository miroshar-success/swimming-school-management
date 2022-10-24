import { Card } from '@mui/material';
import React from 'react';
import { i18n } from 'src/i18n';
import actions from 'src/modules/note/importer/noteImporterActions';
import fields from 'src/modules/note/importer/noteImporterFields';
import selectors from 'src/modules/note/importer/noteImporterSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import importerHoc from 'src/view/shared/importer/Importer';

function NoteImportPage() {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('entities.note.importer.hint'),
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
            {i18n('entities.note.importer.title')}
          </MDTypography>
        </MDBox>
        <Importer />
      </Card>
    </>
  );
}

export default NoteImportPage;
