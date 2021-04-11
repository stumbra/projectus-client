import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

const TokenizedRoute = ({
  component: Component,
  ...rest
}: RouteProps): React.ReactElement | null => {
  if (Component) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
  return null;
};

export default TokenizedRoute;
