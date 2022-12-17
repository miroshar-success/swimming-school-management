import React from 'react';
import { i18n } from 'src/i18n';
import AttendanceListTable from 'src/view/attendance/list/AttendanceListTable';
import AttendanceListFilter from 'src/view/attendance/list/AttendanceListFilter';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function AttendanceListPage(props) {
  return (
    <>
      <Card>
        <AttendanceListFilter />
      </Card>
      <Card>
        <AttendanceListTable />
      </Card>
    </>
  );
}

export default AttendanceListPage;
