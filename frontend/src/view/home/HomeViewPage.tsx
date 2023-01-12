import { i18n } from 'src/i18n';

import { Card } from '@mui/material';

import PageLayout from 'src/mui/shared/Layouts/PageLayout';

import SimpleNavbar from 'src/view/shared/Navbars/SimpleNavbar';

export default function HomeViewPage(props) {
  return (
    <>
      <PageLayout>
        <SimpleNavbar
          routes={[
            { name: 'BEGINNING', route: '/' },
            { name: 'REGISTER YOUR SCHOOL', route: '/' },
          ]}
          action={{
            type: 'internal',
            color: 'info',
            route: '/',
            label: 'login',
          }}
        />
      </PageLayout>
    </>
  );
}
