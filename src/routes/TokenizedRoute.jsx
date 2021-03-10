import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IS_LOGGED_IN_QUERY } from './gql';
import { useQuery } from '@apollo/client';

const TokenizedRoute = ({ component: Component }, ...rest) => {
  const { loading, data: { isLoggedIn } = {} } = useQuery(IS_LOGGED_IN_QUERY);

  if (isLoggedIn) return <Redirect to="/dashboard" />;

  if (Component) {
    return !loading && <Route {...rest} render={(props) => <Component {...props} />} />;
  }
  return null;
};

export default TokenizedRoute;
