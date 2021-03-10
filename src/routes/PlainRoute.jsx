import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IS_LOGGED_IN_QUERY } from './gql';
import { useQuery } from '@apollo/client';
import { Wrapper, Backdrop } from './Router.styled';

const PlainRoute = ({ component: Component }, ...rest) => {
  const { loading, data: { isLoggedIn } = {} } = useQuery(IS_LOGGED_IN_QUERY);

  if (isLoggedIn) return <Redirect to="/dashboard" />;

  if (Component) {
    return (
      !loading && (
        <Route
          {...rest}
          render={(props) => (
            <Wrapper>
              <Component {...props} />
              <Backdrop />
            </Wrapper>
          )}
        />
      )
    );
  }
  return null;
};

export default PlainRoute;
