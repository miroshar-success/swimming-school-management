import React from 'react';
import { i18n } from 'src/i18n';
import NoteListFilter from 'src/view/note/list/NoteListFilter';
import NoteListTable from 'src/view/note/list/NoteListTable';
import NoteListToolbar from 'src/view/note/list/NoteListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function NoteListPage(props) {
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
              {i18n('entities.note.list.title')}
            </MDTypography>
            <NoteListToolbar />
          </MDBox>
          <NoteListFilter />
        </MDBox>
        <NoteListTable />
      </Card>
    </>
  );
}

export default NoteListPage;
