import { i18n } from 'src/i18n';
import { useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { Grid, Avatar } from '@mui/material';
import { Theme } from '@mui/material/styles';

import PageLayout from 'src/mui/shared/Layouts/PageLayout';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

import actions from 'src/modules/schools/view/schoolsViewActions';
import selectors from 'src/modules/schools/view/schoolsViewSelectors';

import Header from '../layout/Header';
import Footer from '../layout/Footer';
import SchoolsView from './SchoolsView';

export default function SchoolsViewPage(props) {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <>
      <PageLayout>
        <Header />
        <MDBox
          display="flex"
          justifyContent="center"
          pt={15}
          pb={8}
          sx={({
            palette: {
              transparent: transparentColor,
              white,
            },
            functions: { rgba },
          }: any) => ({
            backgroundColor: rgba(white.main, 0.4),
          })}
        >
          <MDBox width="80%">
            <SchoolsView
              loading={loading}
              record={record}
            />
          </MDBox>
        </MDBox>
        <Footer />
      </PageLayout>
    </>
  );
}
