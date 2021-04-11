import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Landing from 'src/pages/Landing/Landing';
import Register from 'src/pages/Register/Register';
import ForgotPassword from 'src/pages/ForgotPassword/ForgotPassword';
import Dashboard from 'src/pages/Dashboard/Dashboard';
import Tickets from 'src/pages/Tickets/Tickets';
import Projects from 'src/pages/Projects/Projects';
import Board from 'src/pages/Board/Board';
import Details from '../pages/Details/Details';
import ConfirmEmail from 'src/pages/ConfirmEmail/ConfirmEmail';
import ResetPassword from 'src/pages/ResetPassword/ResetPassword';
import ConfirmInvitation from 'src/pages/ConfirmInvitation/ConfirmInvitation';
import Error from 'src/pages/Error/Error';

import PlainRoute from 'src/routes/PlainRoute/PlainRoute';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import TokenizedRoute from 'src/routes/TokenizedRoute/TokenizedRoute';

import { useTranslation } from 'react-i18next';
import moment from 'moment';
import en from 'moment/locale/en-gb';
import lt from 'moment/locale/lt';

const Router = (): React.ReactElement => {
  const { i18n } = useTranslation('common');

  i18n.language === 'en'
    ? moment.updateLocale('en', en)
    : moment.updateLocale('lt', lt);

  return (
    <BrowserRouter>
      <AnimatePresence exitBeforeEnter>
        <Switch location={window.location} key={window.location.pathname}>
          <PlainRoute exact path="/" component={Landing} />
          <PlainRoute exact path="/register" component={Register} />
          <PlainRoute
            exact
            path="/forgot-password"
            component={ForgotPassword}
          />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/tickets" component={Tickets} />
          <PrivateRoute exact path="/projects" component={Projects} />
          <PrivateRoute exact path="/board/:id" component={Board} />
          <PrivateRoute exact path="/ticket/:id" component={Details} />
          <TokenizedRoute
            exact
            path="/user/confirm/:token"
            component={ConfirmEmail}
          />
          <TokenizedRoute
            exact
            path="/user/password/reset/:token"
            component={ResetPassword}
          />
          <TokenizedRoute
            exact
            path="/user/invite/:token"
            component={ConfirmInvitation}
          />
          <Route component={Error} />
        </Switch>
      </AnimatePresence>
    </BrowserRouter>
  );
};

export default Router;
