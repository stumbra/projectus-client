import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Landing from '../pages/Landing/Landing';
import Register from '../pages/Register/Register';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import Dashboard from '../pages/Dashboard/Dashboard';
import Projects from '../pages/Projects/Projects';
import ConfirmEmail from '../pages/ConfirmEmail/ConfirmEmail';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import Error from '../pages/Error/Error';

import PlainRoute from './PlainRoute/PlainRoute';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import TokenizedRoute from './TokenizedRoute/TokenizedRoute';

function Router() {
  return (
    <BrowserRouter>
      <AnimatePresence exitBeforeEnter>
        <Switch location={window.location} key={window.location.pathname}>
          <PlainRoute exact path="/" component={Landing} />
          <PlainRoute exact path="/register" component={Register} />
          <PlainRoute exact path="/forgot-password" component={ForgotPassword} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/projects" component={Projects} />
          <TokenizedRoute exact path="/user/confirm/:token" component={ConfirmEmail} />
          <TokenizedRoute exact path="/user/password/reset/:token" component={ResetPassword} />
          <Route component={Error} />
        </Switch>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default Router;
