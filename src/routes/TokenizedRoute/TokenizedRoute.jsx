import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IS_LOGGED_IN_QUERY } from '../gql';
import { useQuery } from '@apollo/client';

const TokenizedRoute = ({ component: Component }, ...rest) => {
  const { loading, data: { isLoggedIn } = {} } = useQuery(IS_LOGGED_IN_QUERY, {
    fetchPolicy: 'network-only',
  });

  if (loading) return null;

  if (Component) {
    return !isLoggedIn ? (
      <Route {...rest} render={(props) => <Component {...props} />} />
    ) : (
      <Redirect to="/" />
    );
  }
};

export default TokenizedRoute;