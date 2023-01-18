import PageLayout from 'src/mui/shared/Layouts/PageLayout';

import Header from './layout/Header';
import Footer from './layout/Footer';
import Banner from './layout/Banner';

export default function HomeViewPage(props) {
  return (
    <>
      <PageLayout>
        <Header />
        <Banner />
        <Footer />
      </PageLayout>
    </>
  );
}
