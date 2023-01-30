import { i18n } from 'src/i18n';
import { useEffect } from 'react';
import StudentAreaLayout from 'src/view/home/layout/studentAreaLayout';
import { useDispatch } from 'react-redux';
import muiActions from 'src/modules/mui/muiActions';
import Header from 'src/view/home/layout/Header';
import MDTypography from 'src/mui/components/MDTypography';

export default function Dashboard(props) {
  return (
    <>
      <Header />
      <StudentAreaLayout>
        <MDTypography>fsdfsfefsdf</MDTypography>
      </StudentAreaLayout>
    </>
  );
}
