import React from 'react';
import { Route, Redirect, useHistory, RouteProps } from 'react-router-dom';
import { Footer, Header, Sidemenu } from '../../components';
import { Dimmer, Loader } from 'semantic-ui-react';
import { GET_ME_QUERY } from '../gql';
import { useQuery } from '@apollo/client';
import { AuthContext } from '../../context/auth';
import { SidebarProvider } from '../../context/sidebar';
import { Container, Content } from '../Router.styled';
import { useTranslation } from 'react-i18next';

const PrivateRoute = ({
  component: Component,
  ...rest
}: RouteProps): React.ReactElement | null => {
  const history = useHistory();

  const { loading, data: { getMe } = {} } = useQuery(GET_ME_QUERY, {
    fetchPolicy: 'network-only',
    onError: () => {
      history.push('/');
    },
  });

  const { user, setUser } = React.useContext(AuthContext);

  const { t } = useTranslation('common');

  if (loading) {
    return (
      <Dimmer active inverted>
        <Loader size="massive">{t('common.loading')}</Loader>
      </Dimmer>
    );
  }

  if (user?.id === '-1' && getMe) {
    const { id, name, surname, email, avatar } = getMe;
    setUser({ id, name, surname, email, avatar });
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
                  <Content>
                    <Header />
                    <Component {...props} />
                  </Content>
                  <Footer />
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
  return null;
};

export default PrivateRoute;
