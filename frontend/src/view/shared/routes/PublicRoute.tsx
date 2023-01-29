import PermissionChecker from 'src/modules/auth/permissionChecker';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PublicRoute({
  component: Component,
  currentTenant,
  currentUser,
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

        if (permissionChecker.isAuthenticated) {
          if (permissionChecker.isAdmin === true) {
            return <Redirect to="/admin" />;
          } else {
            return <Redirect to="/student" />;
          }
        }

        return <Component {...props} />;
      }}
    />
  );
}

export default PublicRoute;
