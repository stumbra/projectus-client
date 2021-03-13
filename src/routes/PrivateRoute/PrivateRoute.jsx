import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Sidebar } from '../../components';
import { Grid, Segment, Dimmer, Loader } from 'semantic-ui-react';
import { IS_LOGGED_IN_QUERY } from '../gql';
import { useQuery } from '@apollo/client';
import { PrivateWrapper } from '../Router.styled';

const PrivateRoute = ({ component: Component }, ...rest) => {
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
          isLoggedIn ? (
            <PrivateWrapper padded="vertically">
              <Sidebar />
              <Grid.Column stretched width={14}>
                <Segment>
                  <Component {...props} />
                </Segment>
              </Grid.Column>
            </PrivateWrapper>
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );
  }
};

export default PrivateRoute;
