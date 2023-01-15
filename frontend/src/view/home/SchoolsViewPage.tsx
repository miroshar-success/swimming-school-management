import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';

import { Theme } from '@mui/material/styles';

import PageLayout from 'src/mui/shared/Layouts/PageLayout';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

import Header from './layout/Header';
import Footer from './layout/Footer';

export default function HomeViewPage(props) {
  return (
    <>
      <PageLayout>
        <Header />
        <Footer />
      </PageLayout>
    </>
  );
}
