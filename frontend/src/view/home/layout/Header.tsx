import { i18n } from 'src/i18n';
import SimpleNavbar from 'src/view/shared/Navbars/SimpleNavbar';

export default function Header(props) {
  return (
    <SimpleNavbar
      routes={[
        {
          name: i18n('home.menu.schools'),
          route: '/schools',
        },
        {
          name: i18n('home.menu.registerSchool'),
          route: '/admin/auth/signup',
        },
      ]}
      action={{
        type: 'internal',
        color: 'info',
        route: '/admin/auth/signin',
        label: i18n('home.menu.login'),
      }}
    />
  );
}
