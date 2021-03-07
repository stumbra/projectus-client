import React from 'react';
import { Route } from 'react-router-dom';
import { Background } from './Router.styled';

const PlainRoute = ({ component: Component }, ...rest) => {
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
