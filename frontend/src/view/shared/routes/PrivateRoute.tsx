import PermissionChecker from 'src/modules/auth/permissionChecker';
import React from 'react';
import {
  Redirect,
  Route,
  useLocation,
} from 'react-router-dom';
import Layout from 'src/view/layout/Layout';
import config from 'src/config';
import { tenantSubdomain } from 'src/modules/tenant/tenantSubdomain';
import Spinner from 'src/view/shared/Spinner';

function PrivateRoute({
  component: Component,
  currentTenant,
  currentUser,
  permissionRequired,
  ...rest
}) {
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={(props) => {
        const permissionChecker = new PermissionChecker(
          currentTenant,
          currentUser,
        );

        if (!permissionChecker.isAuthenticated) {
          return (
            <Redirect
              to={{
                pathname: '/admin/auth/signin',
                state: { from: location },
              }}
            />
          );
        }

        if (!permissionChecker.isAdmin === true) {
          <Redirect to="/student" />;
        }

        if (!permissionChecker.isEmailVerified) {
          return (
            <Redirect to="/admin/auth/email-unverified" />
          );
        }

        if (
          ['multi', 'multi-with-subdomain'].includes(
            config.tenantMode,
          ) &&
          !tenantSubdomain.isSubdomain
        ) {
          if (permissionChecker.isEmptyTenant) {
            return <Redirect to="/admin/auth/tenant" />;
          }
        } else {
          if (permissionChecker.isEmptyPermissions) {
            return (
              <Redirect to="/admin/auth/empty-permissions" />
            );
          }
        }

        if (!permissionChecker.match(permissionRequired)) {
          return <Redirect to="/admin/403" />;
        }

        if (!currentTenant) {
          return <Spinner />;
        }

        return (
          <Layout {...props}>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
}

export default PrivateRoute;
