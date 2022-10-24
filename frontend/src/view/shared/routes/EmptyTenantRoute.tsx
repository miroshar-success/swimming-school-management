import PermissionChecker from 'src/modules/auth/permissionChecker';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function EmptyTenantRoute({
  component: Component,
  currentUser,
  currentTenant,
  ...rest
}) {
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
                pathname: '/auth/signin',
              }}
            />
          );
        }

        if (!permissionChecker.isEmptyTenant) {
          return <Redirect to="/" />;
        }

        return <Component {...props} />;
      }}
    />
  );
}

export default EmptyTenantRoute;
