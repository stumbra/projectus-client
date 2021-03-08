import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const TokenizedRoute = ({ component: Component }, ...rest) => {
  if (localStorage.getItem('IS_LOGGED_IN') !== null) return <Redirect to="/dashboard" />;

  if (Component) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
  return null;
};

export default TokenizedRoute;
