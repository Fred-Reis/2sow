import React from 'react';
import {
  RouteProps as ReactRouteProps,
  Route as ReactRoute,
} from 'react-router-dom';

import { useAuth } from 'src/hooks/auth';

import Login from 'src/pages/Login';

interface RouteProps extends ReactRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { token } = useAuth();

  return (
    <ReactRoute
      {...rest}
      render={() => {
        return isPrivate === !!token ? (
          <Component />
        ) : isPrivate ? (
          <Login />
        ) : (
          <Component />
        );
      }}
    />
  );
};

export default Route;
