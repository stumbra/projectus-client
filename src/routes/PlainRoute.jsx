import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Background } from './Router.styled';

const PlainRoute = ({ component: Component }, ...rest) => {
  if (localStorage.getItem('IS_LOGGED_IN') !== null) return <Redirect to="/dashboard" />;

  if (Component) {
    return (
      <Route
        {...rest}
        render={(props) => (
          <Background>
            <Component {...props} />
          </Background>
        )}
      />
    );
  }
  return null;
};

export default PlainRoute;
