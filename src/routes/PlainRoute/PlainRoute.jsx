import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Wrapper, Backdrop } from '../Router.styled';
import { IS_LOGGED_IN_QUERY } from '../gql';
import { Dimmer, Loader } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';

const PlainRoute = ({ component: Component }, ...rest) => {
  const { loading, data: { isLoggedIn } = {} } = useQuery(IS_LOGGED_IN_QUERY, {
    fetchPolicy: 'network-only',
  });

  if (loading)
    return (
      <Dimmer active inverted>
        <Loader size="massive">Loading...</Loader>
      </Dimmer>
    );

  if (Component) {
    return (
      <Route
        {...rest}
        render={(props) =>
          !isLoggedIn ? (
            <Wrapper>
              <Component {...props} />
              <Backdrop />
            </Wrapper>
          ) : (
            <Redirect to="dashboard" />
          )
        }
      />
    );
  }
};

export default PlainRoute;
