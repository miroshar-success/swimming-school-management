import { i18n } from 'src/i18n';
import SimpleNavbar from 'src/view/shared/Navbars/SimpleNavbar';
import authSelectors from 'src/modules/auth/authSelectors';
import { useSelector } from 'react-redux';
import PermissionChecker from 'src/modules/auth/permissionChecker';
import internal from 'stream';

export default function Header(props) {
  const currentUser = useSelector(
    authSelectors.selectCurrentUser,
  );

  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );

  const loading = useSelector(authSelectors.selectLoading);

  const permissionChecker = new PermissionChecker(
    currentTenant,
    currentUser,
  );

  return (
    <>
      {loading ? null : (
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
          action={
            permissionChecker.isAuthenticated
              ? {
                  type: 'internal',
                  color: 'primary',
                  route: '/student',
                  label: i18n('auth.myAccount'),
                }
              : {
                  type: 'internal',
                  color: 'info',
                  route: '/admin/auth/signin',
                  label: i18n('home.menu.login'),
                }
          }
        />
      )}
    </>
  );
}
