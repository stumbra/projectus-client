import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Sidebar } from '../../components';
import { Grid, Segment, Dimmer, Loader } from 'semantic-ui-react';
import { GET_ME_QUERY } from '../gql';
import { useQuery } from '@apollo/client';
import { AuthContext } from '../../context/auth';

const PrivateRoute = ({ component: Component }, ...rest) => {
  const { user, setUser } = React.useContext(AuthContext);
  const { loading, data: { getMe } = {} } = useQuery(GET_ME_QUERY, {
    fetchPolicy: 'network-only',
  });

  if (loading)
    return (
      <Dimmer active inverted>
        <Loader size="massive">Loading...</Loader>
      </Dimmer>
    );

  const { name, surname, username, email, avatar } = getMe;

  if (!user && getMe)
    setUser({
      name,
      surname,
      username,
      email,
      avatar,
    });

  if (Component) {
    return (
      <Route
        {...rest}
        render={(props) =>
          getMe ? (
            <Grid
              style={{
                height: '100%',
                width: '100%',
                margin: 0,
                padding: 0,
                backgroundColor: '#0D5286',
              }}
            >
              <Grid.Column stretched style={{ height: '100%', width: '12%' }}>
                <Segment padded raised style={{ backgroundColor: '#fafafa' }}>
                  <Sidebar />
                </Segment>
              </Grid.Column>
              <Grid.Column stretched style={{ height: '100%', width: '88%' }}>
                <Segment padded raised style={{ backgroundColor: '#fafafa' }}>
                  <Component {...props} />
                </Segment>
              </Grid.Column>
            </Grid>
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );
  }
};

export default PrivateRoute;
