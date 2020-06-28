import React from 'react';

import { Switch } from 'react-router-dom';

import Route from './Route';

import Login from 'src/pages/Login';
import SignUp from 'src/pages/SignUp';
import Profile from 'src/pages/Profile';
import AddUser from 'src/pages/AddUser';
import Dashboard from 'src/pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login} />

    <Route path="/signUp" component={SignUp} />
    <Route path="/addUser" component={AddUser} isPrivate />
    <Route path="/profile" component={Profile} isPrivate />
    <Route path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
