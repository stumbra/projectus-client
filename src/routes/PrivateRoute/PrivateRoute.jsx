import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Header, Sidemenu } from '../../components';
import { Dimmer, Loader } from 'semantic-ui-react';
import { GET_ME_QUERY } from '../gql';
import { useQuery } from '@apollo/client';
import { AuthContext } from '../../context/auth';
import { SidebarProvider } from '../../context/sidebar';
import { Container } from '../Router.styled';

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

  const { name, surname, email, avatar } = getMe;

  if (!user && getMe) {
    setUser({ name, surname, email, avatar });
  }

  if (Component) {
    return (
      <Route
        {...rest}
        render={(props) =>
          getMe ? (
            <SidebarProvider>
              <Sidemenu>
                <Container>
                  <Header />
                  <Component {...props} />
                </Container>
              </Sidemenu>
            </SidebarProvider>
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );
  }
};

export default PrivateRoute;
