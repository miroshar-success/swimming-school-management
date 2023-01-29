import { i18n } from 'src/i18n';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import muiActions from 'src/modules/mui/muiActions';
import SimpleNavbar from 'src/view/shared/Navbars/SimpleNavbar';
import Header from 'src/view/home/layout/Header';

export default function StudentAreaPage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(muiActions.doLayout('student'));
  }, [dispatch]);

  return <Header />;
}
