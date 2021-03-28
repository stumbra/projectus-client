import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Landing from '../pages/Landing/Landing';
import Register from '../pages/Register/Register';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import Dashboard from '../pages/Dashboard/Dashboard';
import Tickets from '../pages/Tickets/Tickets';
import Projects from '../pages/Projects/Projects';
import Profile from '../pages/Profile/Profile';
import ConfirmEmail from '../pages/ConfirmEmail/ConfirmEmail';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import ConfirmInvitation from '../pages/ConfirmInvitation/ConfirmInvitation';
import Error from '../pages/Error/Error';

import PlainRoute from './PlainRoute/PlainRoute';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import TokenizedRoute from './TokenizedRoute/TokenizedRoute';

import { useTranslation } from 'react-i18next';
import moment from 'moment';
import en from 'moment/locale/en-gb';
import lt from 'moment/locale/lt';

function Router() {
  const { i18n } = useTranslation('common');

  i18n.language === 'en' ? moment.updateLocale('en', en) : moment.updateLocale('lt', lt);

  return (
    <BrowserRouter>
      <AnimatePresence exitBeforeEnter>
        <Switch location={window.location} key={window.location.pathname}>
          <PlainRoute exact path="/" component={Landing} />
          <PlainRoute exact path="/register" component={Register} />
          <PlainRoute exact path="/forgot-password" component={ForgotPassword} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/tickets" component={Tickets} />
          <PrivateRoute exact path="/projects" component={Projects} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <TokenizedRoute exact path="/user/confirm/:token" component={ConfirmEmail} />
          <TokenizedRoute exact path="/user/password/reset/:token" component={ResetPassword} />
          <TokenizedRoute exact path="/user/invite/:token" component={ConfirmInvitation} />
          <Route component={Error} />
          <Route component={Error} />
        </Switch>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default Router;
