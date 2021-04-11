import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { Wrapper, Backdrop } from '../Router.styled';
import { IS_LOGGED_IN_QUERY } from '../gql';
import { Dimmer, Loader } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';

const PlainRoute = ({
  component: Component,
  ...rest
}: RouteProps): React.ReactElement | null => {
  const { loading, data: { isLoggedIn } = {} } = useQuery(IS_LOGGED_IN_QUERY, {
    fetchPolicy: 'network-only',
  });

  const { t } = useTranslation('common');

  if (loading) {
    return (
      <Dimmer active inverted>
        <Loader size="massive">{t('common.loading')}.</Loader>
      </Dimmer>
    );
  }

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
  return null;
};

export default PlainRoute;
