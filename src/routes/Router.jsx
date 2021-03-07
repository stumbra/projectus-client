import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from '../pages/Landing/Landing';
import Register from '../pages/Register/Register';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import Dashboard from '../pages/Dashboard/Dashboard';
import Error from '../pages/Error/Error';

import PlainRoute from './PlainRoute';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <PlainRoute exact path="/" component={Landing} />
        <PlainRoute exact path="/register" component={Register} />
        <PlainRoute exact path="/forgot-password" component={ForgotPassword} />
        {/* <Route exact path="/user/confirm/:token" component={ConfirmEmail}/>
        <Route exact path="/password/reset/:token" component={ResetPassword}/> */}
        <Route exact path="/dashboard" component={Dashboard} />
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
