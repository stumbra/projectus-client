import React from 'react';
import { Route } from 'react-router-dom';

const TokenizedRoute = ({ component: Component }, ...rest) => {
  if (Component) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
};

export default TokenizedRoute;
