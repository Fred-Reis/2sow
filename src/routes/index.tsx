import React from 'react';

import { Switch } from 'react-router-dom';

import Route from './Route';

import Login from 'src/pages/Login';
import SignUp from 'src/pages/SignUp';
import Dashboard from 'src/pages/Dashboard';
import Profile from 'src/pages/Profile';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login} />

    <Route path="/signUp" component={SignUp} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/profile" component={Profile} isPrivate />
  </Switch>
);

export default Routes;
